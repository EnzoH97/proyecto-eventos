# La Caja Negra 🎵 (** nombre provisional**)

## Temática
Sistema backend para la gestión de **eventos de conciertos y recitales**. La plataforma está diseñada para administrar la compra/reserva de entradas, publicación de eventos y gestión de usuarios mediante roles específicos:
* **Admin:** Control total de la plataforma y usuarios.
* **Organizador:** Creación, edición y gestión de conciertos/eventos.
* **Usuario:** Exploración de eventos disponibles y compra/reserva de tickets.

---

## Tecnologías
* **[Node.js](https://nodejs.org/):** Entorno de ejecución para JavaScript.
* **[Express.js](https://expressjs.com/):** Framework web para el desarrollo de la API REST.
* **[dotenv](https://www.npmjs.com/package/dotenv):** Gestión de variables de entorno.
* **[bcrypt]:** Biblioteca utilizada para hashear y verificar contraseñas de forma segura.
* **[MongoDB]():** Base de datos NoSQL utilizada para el almacenamiento de la información.
* **[Mongoose]():** Facilita la interacción entre Node.js y MongoDB mediante esquemas y modelos.

---

## Estructura del proyecto

```
├── node_modules/
├── src/
│   ├── config/          # Configuraciones generales (base de datos, variables, etc.)
│   ├── controllers/     # Lógica de manejo de peticiones y respuestas HTTP
│   ├── dao/             # Data Access Objects (persistencia de datos)
│   ├── middlewares/     # Middlewares de autenticación, roles y validaciones
│   ├── models/          # Schemas y modelos de datos
│   ├── repositories/    # Capa de repositorios para abstraer la persistencia
│   ├── routes/          # Definición de los endpoints/rutas API
│   ├── services/        # Lógica de negocio principal
│   ├── utils/           # Funciones de ayuda (helpers, hash, logger, etc.)
│   ├── app.js           # Configuración de la aplicación Express
│   └── server.js        # Punto de entrada y arranque del servidor
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🛠️ Instalación y Uso

Si deseas replicar este proyecto en tu entorno local, sigue estas instrucciones:

1. **Clonar el repositorio:**
```bash
git clone https://github.com/EnzoH97/proyecto-eventos.git
```

2.  **Instalar dependencias:**
```bash
npm install
```

3.  **Ejecutar el proyecto en modo desarrollo:**
```bash
npm run dev
```

---

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (puedes guiarte con `.env.example`) y completa los valores de acuerdo con tu entorno local:

```
.env
PORT=
NODE_ENV=
MONGO_URL=
JWT_SECRET=
```

---
## Prueba del endpoint

### Registro de usuarios

Para probar este endpoint, realiza una petición **POST** a la siguiente ruta utilizando **Postman** o cualquier cliente HTTP similar.

**Ruta:**

```http
POST /api/sessions/register
```

### Body esperado

El cuerpo de la petición debe tener el siguiente formato:

```json
{
  "first_name": "Ana",
  "last_name": "Pérez",
  "email": "Ana@Mail.com ",
  "password": "Secreta123"
}
```

### Validaciones

Antes de registrar un usuario, el sistema realiza las siguientes validaciones:

- Todos los campos son obligatorios.
- El email debe tener un formato válido.
- El email se normaliza (`trim` + `lowercase`) antes de almacenarse.
- No se permite registrar un email que ya exista.
- La contraseña debe cumplir con la longitud mínima establecida de 8 caracteres.
- El rol del usuario se asigna automáticamente como `user`.

### Respuesta esperada

Si el registro es exitoso, la API responde con un código **201 Created** y un objeto similar al siguiente:

```json
{
  "status": "success",
  "payload": {
    "id": "...",
    "first_name": "Ana",
    "last_name": "Pérez",
    "email": "ana@mail.com",
    "role": "user"
  }
}
```

> **Importante:** La contraseña nunca se devuelve en la respuesta y se almacena en la base de datos utilizando **bcrypt**, por lo que no queda guardada en texto plano.
