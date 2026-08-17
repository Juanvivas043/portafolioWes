/**
 * Validacion pura del formulario de contacto.
 *
 * Vive aqui, fuera del route handler, para que la misma regla se pueda usar en
 * el cliente sin duplicarla y para poder probarla sin levantar un servidor.
 */

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  date?: string;
  details: string;
  /** El visitante acepto que se traten sus datos para responderle. */
  consent: true;
}

export interface ValidationResult {
  ok: boolean;
  errors: string[];
  data?: ContactPayload;
}

/** Limites generosos para una persona, estrechos para un bot. */
const LIMITS = {
  name: 120,
  email: 160,
  phone: 40,
  date: 40,
  details: 4000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  // Fuera saltos de linea en campos de una linea y espacios de relleno.
  return value.trim().slice(0, max);
}

export function validateContact(input: unknown): ValidationResult {
  const errors: string[] = [];

  if (typeof input !== 'object' || input === null) {
    return { ok: false, errors: ['Solicitud vacía o mal formada.'] };
  }

  const raw = input as Record<string, unknown>;

  const name = clean(raw.name, LIMITS.name);
  const email = clean(raw.email, LIMITS.email);
  const phone = clean(raw.phone, LIMITS.phone);
  const date = clean(raw.date, LIMITS.date);
  const details = clean(raw.details, LIMITS.details);

  if (name.length < 2) errors.push('Escribe tu nombre.');
  if (!EMAIL_PATTERN.test(email)) errors.push('Revisa el correo: no parece válido.');
  if (details.length < 10) errors.push('Cuéntame un poco más sobre el proyecto.');

  /*
   * El consentimiento se comprueba tambien en el servidor, no solo con el
   * `required` del checkbox: el navegador se puede saltar y no habria constancia
   * de que la persona acepto que se traten sus datos.
   */
  if (raw.consent !== true) {
    errors.push('Necesito tu permiso para tratar tus datos y poder responderte.');
  }

  /*
   * Corta la inyeccion de cabeceras: un salto de linea en el nombre o el correo
   * permitiria colar un "Bcc:" y convertir el formulario en un reenviador de
   * spam. Los campos de una linea no pueden contener saltos.
   */
  if (/[\r\n]/.test(name) || /[\r\n]/.test(email) || /[\r\n]/.test(phone)) {
    errors.push('Los datos de contacto no pueden contener saltos de línea.');
  }

  if (errors.length > 0) return { ok: false, errors };

  return { ok: true, errors: [], data: { name, email, phone, date, details, consent: true } };
}

/** Escapa el texto del visitante antes de meterlo en el correo HTML. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
