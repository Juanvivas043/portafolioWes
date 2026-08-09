# TÉRMINOS DE REFERENCIA Y ACUERDO TÉCNICO DE DESARROLLO

**Proyecto:** Portafolio Web de Fotografía y Medios de Alta Resolución **Enfoque
Arquitectónico:** Self-Hosted / Next.js / Almacenamiento Desacoplado

## 1. Objetivo General

Desarrollar e implementar una plataforma web orientada a la exhibición de
fotografía y video de calidad profesional. El proyecto se rige por tres pilares:
**entrega multimedia fluida e instantánea** (sin comprometer resolución), una
**dirección de arte geométrica de alto impacto**, y una **arquitectura de
software escalable y limpia**. La infraestructura debe ser agnóstica al entorno
de alojamiento, asegurando que los archivos pesados no interfieran con el ciclo
de vida del código.

## 2. Directrices de Diseño y UI/UX (Dirección de Arte)

La interfaz de usuario reflejará la profesionalidad del contenido fotográfico
bajo estos parámetros:

- **Geometría y Formas:** Estética de líneas rectas y aristas vivas ("sharp
  edges"). Prohibido el uso de bordes redondeados para mantener un diseño
  sobrio, estructurado y moderno.
- **Paleta Monocromática y Acento:** Esquema fundamentado estrictamente en
  **Negro y Blanco**. Se definirá un **único color de acento** utilizado de
  forma minimalista para llamados a la acción (CTAs) y resaltados interactivos.
- **Diseño Responsivo (Mobile-First):** La interfaz debe adaptarse de manera
  fluida a cualquier resolución de pantalla (móviles, tablets y escritorio) sin
  romper la estructura de bloques geométricos ni sacrificar la legibilidad de
  las secciones.
- **Estructura de la Landing Page:** El inicio se construirá mediante secciones
  de alto impacto. Cada bloque debe ser visualmente distintivo, utilizando el
  contraste y el espacio para guiar la atención del usuario hacia el material
  audiovisual sin distracciones.

## 3. Arquitectura de Software y Estándares de Código

Para garantizar la mantenibilidad y escalabilidad del proyecto, el desarrollo se
regirá bajo los siguientes paradigmas de ingeniería de software:

- **Paradigma Funcional y Declarativo:** En alineación total con la visión de
  Next.js y React, se utilizará programación declarativa basada en funciones
  (Functional Components y Hooks). Se prohíbe la mutación directa del estado y
  se priorizará la inmutabilidad de los datos.
- **Bajo Acoplamiento y Alta Cohesión:** Los componentes deben ser módulos
  independientes que realicen una única tarea de forma excelente (alta cohesión)
  y que tengan la menor dependencia posible de otros módulos o lógicas externas
  (bajo acoplamiento).
- **Principios SOLID (Adaptados a React):**
  - _Single Responsibility:_ Cada componente, hook o función debe tener un único
    motivo para cambiar.
  - _Open/Closed:_ Los componentes de UI deben ser abiertos a la extensión
    (mediante `children` o composición) y cerrados a la modificación interna.
  - _Dependency Inversion:_ Los componentes visuales no deben depender de
    implementaciones directas de obtención de datos, recibiendo la información a
    través de _props_ o abstracciones.
- **Principio de Responsabilidad Compartida / Separación de Concerns:** Debe
  existir una clara delimitación entre la capa de presentación (UI/Componentes),
  la capa de lógica de negocio (Hooks) y la capa de acceso a datos/servicios.
- **Uso de Helpers y Utilidades:** Toda lógica matemática, formateo de fechas,
  manipulación de cadenas o cálculos repetitivos debe ser extraída a funciones
  puras dentro de un directorio de `/helpers`, maximizando la reutilización de
  código y facilitando el testing unitario.

## 4. Prioridad Crítica: SLA de Rendimiento y Entrega de Medios

- **Renderizado Progresivo (Imágenes):** Inyección obligatoria de _placeholders_
  (blur en Base64) en el HTML inicial a través del componente `<Image>` de
  Next.js para evitar el _Cumulative Layout Shift_.
- **Lazy Loading Estricto:** Recursos fuera del _viewport_ inicial (below the
  fold) no iniciarán su descarga hasta que el usuario haga scroll hacia ellos.
- **Streaming Local de Video:** Los videos se servirán desde el sistema de
  archivos local. La aplicación debe manejar cabeceras HTTP
  `206 Partial Content` (carga por fragmentos) para no saturar memoria ni ancho
  de banda.
- **Optimización del Reproductor:** Todo `<video>` debe incluir los atributos
  `preload="metadata"` y `playsInline`, con un atributo `poster` obligatorio
  (primer frame optimizado).

## 5. Estructura de Carpetas Exigida

Se respetará la siguiente jerarquía para cumplir con la separación de
responsabilidades y la gestión de medios:

```text
/
├── .gitignore              # Ignorar estricto de la ruta /public/media/*
├── next.config.js          # Configuración de compresión y optimización local
├── /src
│   ├── /app                # Rutas, layouts y páginas (Presentación de nivel superior)
│   ├── /components         # Componentes modulares, cohesivos y desacoplados
│   ├── /hooks              # Lógica de estado y efectos (Responsabilidad separada)
│   └── /helpers            # Funciones puras y utilidades reutilizables
└── /public
    └── /media              # DIRECTORIO AISLADO PARA MEDIOS PESADOS (No se sube a Git)
        ├── /imagenes       
        └── /videos
```

## 6. Componentes de la pagina

Debes crear los componentes que tendran el codigo y en las page armas las
paginas en base a los componentes

- Header
- Hero
- About
- Proyectos
  - Fotografia (Subpagina)
    - Galeria
    - Contacto
  - Video (Subpagina)
    - Galeria
    - Contacto
- CTA
- Contacto
- Footer

### Header

Debe estar presente en toda la pagina, la cual tendra el nombre del lado
izquierdo, y en medio los enlaces de navegacion: Inicio, About, Proyectos,
Contacto, CTA, Footer y boton CTA. en el responsive que sea menu de hambruguesa,
con side bar con los enlaces y el boton CTA, que tenga un boton de cerrar en el
header.

### About

Esta seccion contara con una descripcion del creador del contenido y su
experiencia, sus valores, su trayectoria, etc.

### Proyectos

Esta seccion sera de enlaze y como vista previa a los dos tipos de trabajo
realizados por el fotografo video y fotografia, que cada una debe llevar a su
pagina con su galeria propia

### Galerias

Esta seccion contara con una galeria de imagenes o videos, sera un grid con
varios tamaños que no sean iguales donde mostraras los videos o imagenes de el
fotografo, cada click a un video o imagen debe abrir un modal o abrirlo grande
para que muestre una pequeña descripcion del trabajo

### CTA

Esta seccion debe ser llamativa y servir como cta

### Contacto

Formulario para que los clientes puedan contactarte, con infomacion de contacto,
y demas

### Footer

Links a redes, nombre del creador, y copyright, desarrollado por Juan de momento

### Nota global

los diseños deben ser arriesgado y exoticos deben ser unicos, que no parezca una
pagina comercial si no de alguien creativo, no debe parecer generada por IA;
evita el uso de emojis, y textos resaltados con fondos.
