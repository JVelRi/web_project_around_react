# Tripleten web_project_around_react

Proyecto del sprint "Alrededor de los EE.UU." de TripleTen, migrado a **React con TypeScript**. Es una galería de tarjetas de lugares conectada a una API: puedes editar tu perfil, cambiar tu avatar, agregar tarjetas con imagen y título, darles "me gusta", eliminarlas y ver la imagen ampliada en una ventana emergente.

## Funcionalidad

- Carga del perfil y de las tarjetas desde la API al abrir la página.
- Edición del nombre y la descripción del perfil.
- Cambio de la foto de perfil mediante una URL.
- Agregar nuevas tarjetas (título + URL de la imagen).
- Dar y quitar "me gusta" a una tarjeta.
- Eliminar una tarjeta, con una ventana de confirmación.
- Ver la imagen de una tarjeta ampliada en una ventana emergente.
- Las ventanas emergentes se cierran con el botón "×", haciendo clic fuera de ellas o con la tecla Esc.

## Tecnologías y técnicas utilizadas

- **React** con componentes funcionales y los hooks `useState` y `useEffect`.
- **TypeScript**, con tipos para los datos de la API (`UserData`, `CardData`), para las props de cada componente y para la configuración de las ventanas emergentes (`PopupConfig`).
- **Vite** como herramienta de desarrollo y de compilación.
- HTML semántico y metodología **BEM** para las clases CSS.
- CSS con importaciones modulares por bloque.
- **Fetch API** para comunicarse con el servidor, con una función genérica `request<T>` que centraliza los encabezados y el manejo de errores.
- Renderizado de listas con `map` y `key`, y actualización del estado sin modificar los arreglos originales (`spread`, `filter` y `map`).

## Estructura del proyecto

```
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

### Responsabilidad de cada componente

| Componente    | Responsabilidad                                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------------------------------- |
| `App`         | Reúne `Header`, `Main` y `Footer`.                                                                                |
| `Header`      | Muestra el logotipo de la página.                                                                                 |
| `Main`        | Guarda el estado (usuario, tarjetas y ventana abierta), llama a la API y dibuja el perfil y la lista de tarjetas. |
| `Card`        | Muestra una tarjeta y avisa cuando se pulsa "me gusta", eliminar o la imagen.                                     |
| `Popup`       | Cáscara común de las ventanas emergentes: botón de cierre, título y contenido.                                    |
| `NewCard`     | Formulario para agregar una tarjeta.                                                                              |
| `EditProfile` | Formulario para editar el nombre y la descripción.                                                                |
| `EditAvatar`  | Formulario para cambiar la foto de perfil.                                                                        |
| `ImagePopup`  | Muestra la imagen ampliada con su pie.                                                                            |
| `RemoveCard`  | Botón de confirmación para eliminar una tarjeta.                                                                  |
| `Footer`      | Muestra los derechos de autor.                                                                                    |

## Migración de TypeScript con POO a React

El proyecto anterior estaba escrito en TypeScript con Programación Orientada a Objetos. Para llevarlo a React, cada clase se reemplazó por el concepto equivalente del nuevo modelo:

| Antes (POO)                                 | Ahora (React)                                                                                   |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `Card`                                      | Componente `Card`, que recibe los datos y los manejadores por props.                            |
| `Section`                                   | Un `map` sobre el arreglo de tarjetas dentro de `Main`.                                         |
| `Popup`, `PopupWithImage` y `PopupWithForm` | Un único componente `Popup` que recibe su contenido como `children`, en lugar de usar herencia. |
| `UserInfo`                                  | El estado `user` de `Main`.                                                                     |
| Clase `Api`                                 | Funciones de `utils/api.ts`, apoyadas en la función genérica `request<T>`.                      |
| Manipulación directa del DOM                | Estado de React: la interfaz se actualiza cuando cambia el estado.                              |

Las ventanas emergentes se controlan con un único estado, `popup`, que guarda un objeto `PopupConfig` con el título, la variante visual y el contenido ya armado. Si el estado es `null`, la ventana está cerrada.

## API

El proyecto se comunica con la API de práctica de TripleTen, usando las siguientes operaciones:

| Acción               | Método   | Ruta                   |
| -------------------- | -------- | ---------------------- |
| Obtener el perfil    | `GET`    | `/users/me`            |
| Obtener las tarjetas | `GET`    | `/cards`               |
| Editar el perfil     | `PATCH`  | `/users/me`            |
| Cambiar el avatar    | `PATCH`  | `/users/me/avatar`     |
| Agregar una tarjeta  | `POST`   | `/cards`               |
| Eliminar una tarjeta | `DELETE` | `/cards/:cardId`       |
| Dar "me gusta"       | `PUT`    | `/cards/:cardId/likes` |
| Quitar "me gusta"    | `DELETE` | `/cards/:cardId/likes` |

La dirección base y el token de autorización están en `src/utils/constants.ts`.

## Instalación y uso

1. Clona el repositorio:

   ```bash
   git clone https://github.com/JVelRi/web_project_around_react.git
   ```

2. Entra a la carpeta del proyecto e instala las dependencias:

   ```bash
   cd web_project_around_react
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Para generar la versión de producción:

   ```bash
   npm run build
   ```
