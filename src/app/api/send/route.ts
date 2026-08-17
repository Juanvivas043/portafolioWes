import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { validateContact, escapeHtml } from '@/helpers/contactValidation';

/*
 * El formulario de contacto envia aqui.
 *
 * Es la unica parte del sitio que necesita servidor: el resto son paginas
 * estaticas. Por eso se marca explicitamente como dinamica, para que el build
 * no intente resolverla en tiempo de compilacion.
 */
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** Lee la configuracion SMTP del entorno y avisa si falta algo. */
function readSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    return { ok: false as const, missing: [
      !host && 'SMTP_HOST',
      !user && 'SMTP_USER',
      !pass && 'SMTP_PASSWORD',
    ].filter(Boolean) as string[] };
  }

  return {
    ok: true as const,
    config: {
      host,
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: (process.env.SMTP_SECURE ?? 'true') === 'true',
      auth: { user, pass },
    },
    from: user,
    to: process.env.CONTACT_TO_EMAIL || user,
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: ['No se pudo leer la solicitud.'] },
      { status: 400 }
    );
  }

  const validation = validateContact(body);
  if (!validation.ok || !validation.data) {
    return NextResponse.json({ ok: false, errors: validation.errors }, { status: 400 });
  }

  const smtp = readSmtpConfig();
  if (!smtp.ok) {
    // El detalle va al log del servidor, no a la respuesta: al visitante no le
    // sirve saber que variable falta, y publicarlo da pistas a un atacante.
    console.error(`[api/send] Faltan variables de entorno: ${smtp.missing.join(', ')}`);
    return NextResponse.json(
      { ok: false, errors: ['El envío no está configurado. Escríbeme por WhatsApp o correo.'] },
      { status: 500 }
    );
  }

  const { name, email, phone, date, details } = validation.data;

  const transporter = nodemailer.createTransport(smtp.config);

  const filaSiHay = (etiqueta: string, valor?: string) =>
    valor ? `<tr><td style="padding:4px 12px 4px 0;color:#888;">${etiqueta}</td><td style="padding:4px 0;color:#111;">${escapeHtml(valor)}</td></tr>` : '';

  try {
    /*
     * Dos correos con prioridades distintas:
     *
     * 1. El aviso a WES es el que importa. Si este falla, la solicitud se ha
     *    perdido y hay que decirselo al visitante.
     * 2. La confirmacion al visitante es cortesia. Si falla (correo tipografiado,
     *    buzon lleno), el mensaje YA llego a su destino: seria enganoso mostrar
     *    un error. Se registra en el log y se responde ok igualmente.
     */
    await transporter.sendMail({
      /*
       * El remitente es siempre la cuenta autenticada: Gmail rechaza enviar en
       * nombre de un tercero. El correo del visitante va en replyTo, asi que
       * responder desde la bandeja le llega directamente a el.
       */
      from: `"Portafolio WES" <${smtp.from}>`,
      to: smtp.to,
      replyTo: `"${name}" <${email}>`,
      subject: `Nueva solicitud de ${name}`,
      text: [
        `Nombre: ${name}`,
        `Correo: ${email}`,
        phone ? `Teléfono: ${phone}` : null,
        date ? `Fecha tentativa: ${date}` : null,
        '',
        'Proyecto:',
        details,
      ]
        .filter((line) => line !== null)
        .join('\n'),
      html: `
        <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;">
          <h2 style="margin:0 0 4px;font-size:18px;color:#111;">Nueva solicitud desde el portafolio</h2>
          <p style="margin:0 0 16px;color:#666;font-size:13px;">Responde a este correo para contestarle directamente.</p>
          <table style="border-collapse:collapse;font-size:14px;margin-bottom:16px;">
            ${filaSiHay('Nombre', name)}
            ${filaSiHay('Correo', email)}
            ${filaSiHay('Teléfono', phone)}
            ${filaSiHay('Fecha tentativa', date)}
          </table>
          <div style="border-left:3px solid #DFFF00;padding-left:12px;color:#111;font-size:14px;white-space:pre-wrap;">${escapeHtml(details)}</div>
        </div>
      `,
    });

    // --- 2. Confirmacion al visitante (mejor esfuerzo) ---
    try {
      await transporter.sendMail({
        from: `"WES — Fotografía & Video" <${smtp.from}>`,
        to: email,
        replyTo: smtp.to,
        subject: 'Recibí tu mensaje — WES',
        text: [
          `Hola ${name},`,
          '',
          'Recibí tu solicitud y te responderé dentro de las próximas 24 horas.',
          '',
          'Esto fue lo que me enviaste:',
          '',
          details,
          '',
          date ? `Fecha tentativa: ${date}` : null,
          '',
          'Si necesitas respuesta inmediata, escríbeme por WhatsApp.',
          '',
          'WES — Fotografía & Video',
          'Caracas, Venezuela',
        ]
          .filter((line) => line !== null)
          .join('\n'),
        html: `
          <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;color:#111;">
            <h2 style="margin:0 0 4px;font-size:18px;">Hola ${escapeHtml(name)}, recibí tu mensaje</h2>
            <p style="margin:0 0 16px;color:#666;font-size:14px;">
              Te responderé dentro de las próximas 24 horas. Si necesitas respuesta inmediata, escríbeme por WhatsApp.
            </p>
            <p style="margin:0 0 6px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.08em;">Tu mensaje</p>
            <div style="border-left:3px solid #DFFF00;padding-left:12px;font-size:14px;white-space:pre-wrap;">${escapeHtml(details)}</div>
            ${date ? `<p style="margin:16px 0 0;color:#666;font-size:13px;">Fecha tentativa: ${escapeHtml(date)}</p>` : ''}
            <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
            <p style="margin:0;color:#888;font-size:12px;">
              WES — Fotografía &amp; Video · Caracas, Venezuela<br />
              Recibes este correo porque escribiste desde el formulario del portafolio.
            </p>
          </div>
        `,
      });
    } catch (confirmationError) {
      console.error('[api/send] La solicitud llegó, pero falló la confirmación al visitante:', confirmationError);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[api/send] Falló el envío:', error);
    return NextResponse.json(
      { ok: false, errors: ['No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme por WhatsApp.'] },
      { status: 502 }
    );
  }
}
