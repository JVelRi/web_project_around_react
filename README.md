# Around The U.S. — React + TypeScript

Proyecto del sprint **«Alrededor de los EE.UU.» de TripleTen**, desarrollado con React y TypeScript. Consiste en una aplicación web interactiva que permite explorar una galería de lugares mediante tarjetas con imágenes y títulos.

La aplicación se conecta a una API para obtener y actualizar la información del usuario y las tarjetas. Cada usuario puede personalizar su perfil, agregar nuevos lugares, dar «me gusta» a las publicaciones y eliminar sus propias tarjetas.

El objetivo del proyecto es trasladar una aplicación desarrollada originalmente con TypeScript y Programación Orientada a Objetos (POO) al ecosistema de React, aplicando componentes funcionales, hooks, gestión de estados, Context API y comunicación con servicios externos.

## Funcionalidades

- **Carga de información:** obtiene el perfil del usuario y las tarjetas existentes desde la API al iniciar la aplicación.
- **Edición del perfil:** permite modificar el nombre y la descripción del usuario.
- **Cambio de avatar:** permite actualizar la imagen de perfil mediante una URL.
- **Creación de tarjetas:** permite agregar nuevos lugares indicando un título y la URL de una imagen.
- **Sistema de «me gusta»:** permite dar y quitar «me gusta» a las tarjetas.
- **Eliminación de tarjetas:** permite eliminar tarjetas propias mediante una ventana de confirmación.
- **Visualización de imágenes:** permite ampliar las imágenes de las tarjetas en una ventana emergente.
- **Ventanas emergentes:** permite abrir y cerrar los diferentes formularios y ventanas de la aplicación. Se pueden cerrar mediante el botón correspondiente, haciendo clic fuera de ellas o presionando la tecla Esc.
- **Validación de formularios:** utiliza las reglas de validación HTML y un hook personalizado para mostrar mensajes de error y controlar el envío de los formularios.

## Tecnologías y técnicas utilizadas

- **React:** componentes funcionales y hooks como `useState`, `useEffect`, `useContext` y `useRef`.
- **TypeScript:** tipado de los datos de la API, propiedades de componentes, estados y configuraciones de ventanas emergentes.
- **Context API:** centralización y distribución de información del usuario y funciones compartidas entre componentes.
- **Vite:** herramienta de desarrollo y compilación del proyecto.
- **HTML5:** estructura semántica y validación nativa de formularios.
- **CSS3:** estilos organizados por bloques siguiendo la metodología BEM.
- **Fetch API:** comunicación con el servidor mediante solicitudes HTTP.
- **Programación Orientada a Objetos:** implementación de una clase `Api` que centraliza las operaciones de comunicación con el servidor.
- **Hooks personalizados:** implementación de `useFormValidation` para reutilizar la lógica de validación de formularios.
- **Gestión inmutable del estado:** actualización de arreglos y objetos mediante métodos como `map`, `filter` y el operador spread.

## Estructura del proyecto

```text
src/
├── main.tsx
├── App.tsx
├── components/
│   ├── Header/
│   │   └── Header.tsx
│   ├── Footer/
│   │   └── Footer.tsx
│   └── Main/
│       ├── Main.tsx
│       ├── Card/
│       │   └── Card.tsx
│       └── Popup/
│           ├── Popup.tsx
│           ├── NewCard/
│           ├── EditProfile/
│           ├── EditAvatar/
│           ├── ImagePopup/
│           └── RemoveCard/
├── contexts/
│   └── CurrentUserContext.tsx
├── hooks/
│   └── useFormValidation.ts
├── types/
│   └── types.ts
├── utils/
│   ├── api.ts
│   └── constants.ts
├── styles/
│   ├── index.css
│   ├── blocks/
│   └── vendor/
└── assets/
```

## Responsabilidad de los componentes

| Componente    | Responsabilidad                                                                                                                     |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `App`         | Administra los estados principales de la aplicación, realiza las solicitudes a la API y proporciona el contexto compartido.         |
| `Header`      | Muestra el logotipo de la página.                                                                                                   |
| `Main`        | Muestra el perfil del usuario, las acciones disponibles y la galería de tarjetas.                                                   |
| `Card`        | Representa una tarjeta y permite interactuar con ella mediante las acciones de «me gusta», eliminación y visualización de imágenes. |
| `Popup`       | Componente reutilizable que proporciona la estructura común de las ventanas emergentes.                                             |
| `NewCard`     | Formulario para crear nuevas tarjetas.                                                                                              |
| `EditProfile` | Formulario para modificar el nombre y la descripción del usuario.                                                                   |
| `EditAvatar`  | Formulario para actualizar la imagen de perfil.                                                                                     |
| `ImagePopup`  | Muestra una imagen ampliada y su título.                                                                                            |
| `RemoveCard`  | Presenta la confirmación para eliminar una tarjeta.                                                                                 |
| `Footer`      | Muestra la información de derechos de autor.                                                                                        |

## Gestión del estado y arquitectura de React

El estado principal de la aplicación se encuentra en `App.tsx`, donde se administran los datos del usuario, las tarjetas y la ventana emergente activa.

Se utiliza **CurrentUserContext** para compartir la información del usuario y determinadas funciones entre los componentes que necesitan acceder a ellas, evitando pasar innecesariamente las mismas propiedades a través de varios niveles de componentes.

Las ventanas emergentes se controlan mediante un único estado, `popup`, que almacena una configuración `PopupConfig` con el título, la variante visual y el contenido de la ventana. Cuando su valor es `null`, no hay ninguna ventana abierta.

Los formularios utilizan controladores de envío (`submit`) para ejecutar las operaciones correspondientes. Las funciones que realizan las solicitudes a la API y actualizan los estados se encuentran centralizadas en `App.tsx`.

## API

El proyecto se comunica con la API de práctica de TripleTen mediante una instancia de la clase `Api`, exportada desde `src/utils/api.ts`.

Esta clase centraliza las solicitudes HTTP, la configuración de encabezados, el token de autorización y el manejo de errores mediante una función genérica `request<T>`.

Las operaciones disponibles son:

| Acción               | Método   | Ruta                   |
| -------------------- | -------- | ---------------------- |
| Obtener el perfil    | `GET`    | `/users/me`            |
| Obtener las tarjetas | `GET`    | `/cards`               |
| Editar el perfil     | `PATCH`  | `/users/me`            |
| Cambiar el avatar    | `PATCH`  | `/users/me/avatar`     |
| Agregar una tarjeta  | `POST`   | `/cards`               |
| Eliminar una tarjeta | `DELETE` | `/cards/:cardId`       |
| Dar «me gusta»       | `PUT`    | `/cards/:cardId/likes` |
| Quitar «me gusta»    | `DELETE` | `/cards/:cardId/likes` |

La dirección base y el token de autorización se encuentran definidos en `src/utils/constants.ts`.

## Validación de formularios

La validación se implementa mediante las propiedades nativas de HTML, como `required`, `minLength`, `maxLength` y `type`.

Además, se utiliza el hook personalizado `useFormValidation`, que centraliza la comprobación de los campos, la obtención de los mensajes de error y el control del estado de validez de los formularios.

Los formularios de creación de tarjetas, edición del perfil y actualización del avatar utilizan esta lógica compartida.

## Instalación y ejecución

### Requisitos previos

- Node.js.
- npm.
- Git.

### 1. Clonar el repositorio

```bash
git clone https://github.com/JVelRi/web_project_around_react.git
```

### 2. Acceder al directorio del proyecto

```bash
cd web_project_around_react
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Vite iniciará el servidor local y mostrará la dirección desde la que se puede acceder a la aplicación.

### 5. Generar la versión de producción

```bash
npm run build
```

Este comando ejecuta el proceso de compilación configurado en el proyecto y genera los archivos de producción en el directorio `dist`.

## Autor

Proyecto desarrollado como parte del programa de formación de **TripleTen**, correspondiente al sprint «Around The US — React».
