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
* **[bcrypt](https://www.npmjs.com/package/bcrypt):** Biblioteca utilizada para hashear y verificar contraseñas de forma segura.
* **[MongoDB](https://www.mongodb.com/):** Base de datos NoSQL utilizada para el almacenamiento de la información.
* **[Mongoose](https://mongoosejs.com/):** Facilita la interacción entre Node.js y MongoDB mediante esquemas y modelos.
* **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken):** Generación y verificación de tokens JWT para la autenticación.
* **[cookie-parser](https://www.npmjs.com/package/cookie-parser):** Middleware para analizar y gestionar las cookies recibidas en las solicitudes.

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
JWT_EXPIRE_IN=

<<<<<<< HEAD
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=tu email
MAIL_PASS= (debes generar una contraseña usando el siguiente link)#http://myaccount.google.com/apppasswords
MAIL_FROM=TICKETS
=======
GITHUB_CLIENT_ID= 
GITHUB_CLIENT_SECRET= 
GITHUB_CALLBACK_URL=
>>>>>>> 47b4ca76d83025252d2bbb55a79dd7da0f940671
```
 
> **⚠️ Aclaración sobre GitHub:** 
Las variables relacionadas con GitHub OAuth (GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET y GITHUB_CALLBACK_URL) no son obligatorias para el funcionamiento principal del proyecto. 
Se incorporaron como una implementación adicional para realizar pruebas con estrategias de autenticación mediante providers externos y dejar el proyecto preparado para futuras estrategias. 
 Si no se desea utilizar la autenticación con GitHub, se puede eliminar la configuración y las variables relacionadas con este provider sin afectar las estrategias principales de registro, login y current.


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

### Login 

Para probar este endpoint, realiza una petición POST a la siguiente ruta utilizando Postman o cualquier cliente HTTP similar.

**Ruta:**

```http
POST /api/sessions/login
```

### Body esperado

El cuerpo de la petición debe tener el siguiente formato:

```json
{
  "email": "Ana@Mail.com",
  "password": "Secreta123"
}
```
### Validaciones

Para iniciar sesión, el sistema realiza las siguientes validaciones:

- El email debe coincidir con el utilizado durante el registro
- La contraseña debe coincidir con la utilizada durante el registro.

### Respuesta esperada

Si el login es exitoso, la API responde con un código **200** y un objeto similar al siguiente:

```json
{ 
  "status": "success", 
  "message": "Login correcto" 
}
```

> **Importante:** además, se establece la cookie currentUser con la configuración correspondiente para mantener la sesión.

Si alguno de los dos campos es incorrecto, la API responde con un código **401**:

### Body esperado

```json
{ 
  "status": "error", 
  "message": "Credenciales inválidas" 
}
```
> **Importante:** se debe mostrar un mensaje genérico para evitar brindar información que pueda dar pistas a un posible atacante.

### Current

**Ruta:**

```http
GET /api/sessions/current
```
### Respuesta esperada

Si existe una sesión válida, la API responde con un código **200**:

### Body esperado

El cuerpo de la petición debe tener el siguiente formato:

```json
{ 
  "status": "success", 
  "payload": 
  { 
    "id": "665f2a...", 
    "email": "ana@mail.com", 
    "role": "user" 
    } 
}
```
Si la sesión ya expiró o no existe una sesión válida, la API responde con un código **401**:

### Respuesta esperada

```json
{ 
  "status": "error", 
  "message": "No autenticado" 
}
```

### Logout

**Ruta:**

```http
POST /api/sessions/logout
```
### Respuesta esperada

Una vez cerrada la sesión la API responde con un codigo **200**

### Respuesta esperada

```json
{ 
  "status": "success", 
  "message": "Sesión cerrada" 
}
```

> **Importante:** al cerrar la sesión, la cookie currentUser también se elimina. Por lo tanto, si posteriormente se intenta ejecutar el endpoint /api/sessions/current, este devolverá el error correspondiente al no existir una sesión válida. 

---

## Autenticación con Passport.js

La autenticación se encuentra centralizada mediante estrategias de **Passport.js**, sin modificar el contrato externo de las rutas existentes.

### Estrategias implementadas

- **`register`**: recibe los datos del registro y delega la lógica de negocio en `userService.registerUser()`, donde se realizan las validaciones, normalización del email, control de unicidad, hash de contraseña y asignación del rol `user`.
- **`login`**: valida email y contraseña mediante Passport. Las credenciales inválidas responden con un mensaje genérico.
- **`current`**: obtiene el JWT desde la cookie `currentUser`, lo valida y deja el usuario autenticado disponible en `req.user`.
- **`github`**: estrategia de provider externo preparada para autenticación mediante GitHub.

Passport se inicializa en `app.js` mediante `passport.initialize()`, mientras que las estrategias se mantienen centralizadas en `src/config/passport.config.js`. De esta forma, se pueden incorporar futuras estrategias como Google u otros providers sin modificar `app.js`.

### Rutas de autenticación

- `POST /api/sessions/register`
- `POST /api/sessions/login`
- `GET /api/sessions/current`
- `POST /api/sessions/logout`
- `GET /api/sessions/github`
- `GET /api/sessions/github/callback`

> **Importante:** El archivo `.env` contiene los valores reales, se tiene que agregarlo a un archivo .gitignore para no subirlo al repositorio. El archivo `.env.example` sirve como referencia para configurar el proyecto.

### Creacion de eventos

Para probar este endpoint, realiza una petición POST a la siguiente ruta utilizando Postman o cualquier cliente HTTP similar.

```http
POST /api/events
```
> **Importante:** Solo el usuario con rol de organizador ("organizer") puede crear un evento.

### Body esperado

El cuerpo de la petición debe tener el siguiente formato:

```json
{
  "name": "Concierto Banda x",
  "date": "2026-10-15T21:00:00-03:00",
  "capacity": 500
}
```

### Respuesta esperada

Una vez creado el evento la API responde con un codigo **201**

```json
{ 
  "status": "success", 
  "payload": { 
    "id": "6690...", 
    "name": "Concierto Banda x",
    "date": "2026-10-15T21:00:00-03:00",
    "capacity": 500,
    "organizer": "665f2a..." 
  } 
}
```
> **Importante:** Esta respuesta solo aparecera si se es organizador.

Si el usuario no esta logeado no podra realizar la acción ya que no va a estar autenticado y la API responde con un código **401**

### Respuesta esperada

```json
{
 "status": "error", 
 "message": "No autenticado" 
}
```

Si un usuario con rol "user" intenta crear un evento, la API responde con un error **403** ya que no tienen la autorizacion para realizar dicha acción. 

### Respuesta esperada

```json
{ 
  "status": "error", 
  "message": "No tenés permisos para realizar esta acción" 
}
```

### Actualizar eventos

Para probar este endpoint, realiza una petición PUT a la siguiente ruta utilizando Postman o cualquier cliente HTTP similar.

```http
PUT /api/events/{idEvento}
```
> **Importante:** Los organizadores pueden modificar los eventos de su propiedad

### Body esperado

El cuerpo de la petición debe tener el mismo formato que en la creacion pero con las modificaciones deseadas:

### Body esperado

El cuerpo de la petición debe tener el siguiente formato:

```json
{
  "name": "Concierto Banda y",
  "date": "2026-11-15T21:23:00-03:00",
  "capacity": 1500
}
```

### Respuesta esperada

Una vez actualizado el evento la API responde con un codigo **200**

```json
{ 
  "status": "success", 
  "payload": { 
    "id": "6690...", 
    "name": "Concierto Banda y",
    "date": "2026-11-15T21:23:00-03:00",
    "capacity": 1500,
    "organizer": "665f2a..." 
  } 
}
```
Si un organizador intenta modificar un evento que no es de su propiedad, la API responde con un error **403** ya que no tienen la autorizacion para realizar dicha acción. 

---

## Tickets

### Inscripción a un evento

Para probar este endpoint, realiza una petición POST a la siguiente ruta utilizando Postman o cualquier cliente HTTP similar.

```http
POST /api/tickets/event/:eid/tickets
```
> **Importante:** el usuario debe estar autenticado para poder inscribirse a un evento.

### Body esperado

El cuerpo de la petición debe tener el siguiente formato:

```json
{
  "quantity": 2
}
```

### Validaciones

Antes de crear el ticket, el sistema realiza las siguientes validaciones:

- El evento indicado en `eid` debe existir.
- El evento debe encontrarse en estado `published` (no `draft`, `cancelled` ni `finished`).
- La fecha del evento no debe haber pasado.
- El usuario no debe tener ya un ticket `confirmed` para ese mismo evento.
- Debe existir cupo suficiente disponible (`capacity - reserved >= quantity`).

### Respuesta esperada

Una vez creada la inscripción la API responde con un codigo **201**

```json
{ 
  "status": "success", 
  "message": "Inscripción realizada con éxito", 
  "data": { 
    "id": "6690...", 
    "event": "6680...",
    "quantity": 2,
    "status": "confirmed",
    "reservationCode": "ABC123"
  } 
}
```
> **Importante:** al confirmarse la inscripción se envía automáticamente un email al usuario con el código de reserva, el nombre del evento, la fecha/ubicación y la cantidad de lugares reservados.

Si el usuario no esta logeado no podra realizar la acción ya que no va a estar autenticado y la API responde con un código **401**

### Respuesta esperada

```json
{
 "status": "error", 
 "message": "No autenticado" 
}
```

Si el evento indicado no existe, la API responde con un código **404**

### Respuesta esperada

```json
{
 "status": "error", 
 "message": "Evento no encontrado" 
}
```

Si el evento no está `published` (está cancelado, finalizado o aún en borrador) o ya pasó su fecha, la API responde con un código **400** ya que se trata de un error de negocio.

### Respuesta esperada

```json
{
 "status": "error", 
 "message": "El evento no esta disponible para anotarse" 
}
```

Si no hay cupo suficiente para la cantidad solicitada, la API responde con un código **400** con un mensaje claro.

### Respuesta esperada

```json
{
 "status": "error", 
 "message": "No hay cupos disponibles" 
}
```

Si el usuario ya cuenta con una inscripción activa para ese evento, la API responde con un código **409** ya que no se permiten inscripciones duplicadas.

### Respuesta esperada

```json
{
 "status": "error", 
 "message": "El ususario ya se encuentra anotado en el evento" 
}
```

### Mis tickets

Para probar este endpoint, realiza una petición GET a la siguiente ruta utilizando Postman o cualquier cliente HTTP similar.

```http
GET /api/tickets/my-tickets
```

### Respuesta esperada

Devuelve, con un código **200**, el listado de los tickets propios del usuario autenticado.

```json
{ 
  "status": "success", 
  "message": "Listado de ticket obtenida correctamente", 
  "data": [ 
    { 
      "id": "6690...", 
      "event": "6680...", 
      "quantity": 2, 
      "status": "confirmed", 
      "reservationCode": "ABC123" 
    } 
  ] 
}
```

### Tickets de un evento

Para probar este endpoint, realiza una petición GET a la siguiente ruta utilizando Postman o cualquier cliente HTTP similar.

```http
GET /api/events/:eid/tickets
```
> **Importante:** Solo el organizador dueño del evento o un usuario con rol `admin` pueden listar los tickets del evento.

### Respuesta esperada

Una vez obtenido el listado la API responde con un codigo **200**

```json
{ 
  "status": "success", 
  "message": "Listado de ticket obtenida correctamente", 
  "data": [ ] 
}
```

Si un usuario con rol `user` intenta acceder a este endpoint, la API responde con un error **403** ya que no tienen la autorizacion para realizar dicha acción. 

### Respuesta esperada

```json
{ 
  "status": "error", 
  "message": "No tenés permisos para realizar esta acción" 
}
```

Si un organizador intenta listar los tickets de un evento que no es de su propiedad, la API responde con un error **403** de la misma manera.

### Cancelación de un ticket

Para probar este endpoint, realiza una petición PATCH a la siguiente ruta utilizando Postman o cualquier cliente HTTP similar.

```http
PATCH /api/tickets/:tid/cancel
```
> **Importante:** solo puede cancelar el ticket su dueño o un usuario con rol `admin`.

### Validaciones

- El ticket indicado en `tid` debe existir.
- El ticket no debe estar cancelado previamente.

### Respuesta esperada

Una vez cancelado el ticket la API responde con un codigo **200**

```json
{ 
  "status": "success", 
  "message": "Ticket cancelado correctamente", 
  "data": { 
    "id": "6690...", 
    "status": "cancelled",
    "cancelledAt": "2026-09-19T15:00:00.000Z"
  } 
}
```
> **Importante:** al cancelar el ticket, el cupo ocupado se libera en el evento y se envía un email de notificación de cancelación al usuario.

Si un usuario intenta cancelar un ticket que no le pertenece y no es `admin`, la API responde con un error **403** ya que no tienen la autorizacion para realizar dicha acción. 

### Respuesta esperada

```json
{ 
  "status": "error", 
  "message": "no tenes permisos para cancelar este ticket" 
}
```
