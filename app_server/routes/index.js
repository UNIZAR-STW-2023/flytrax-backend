var express = require('express');
var router = express.Router();
const ctrlUsers = require("../controllers/users");
const ctrlForo = require("../controllers/foro");
const ctrlAdmin = require("../controllers/admin");
const ctrlUserMetrics = require("../controllers/usersMetrics");
const ctrlAirportsMetrics = require("../controllers/airportsMetrics");


//Users
router
    .route('/users')
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener lista de usuarios
 *     description: Retorna una lista de usuarios.
 *     security:
 *          - BearerAuth: []
 *     responses:
 *       200:
 *         description: OK. La lista de usuarios se ha obtenido correctamente.
 *       404:
 *         description: No se encontraron usuarios.
 *       500:
 *         description: Error del servidor. Ha ocurrido un error al obtener los usuarios.
 *     tags:
 *       - Administrador
 */
    .get(ctrlAdmin.verifyToken, ctrlUsers.getUsers) //Esta es solo para el admin

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     description: Crea un nuevo usuario con los datos proporcionados en el cuerpo de la solicitud.
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         description: Datos del usuario a crear.
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             surname:
 *               type: string
 *             nickname:
 *               type: string
 *             email:
 *               type: string
 *             dateOfBirth:
 *               type: string
 *             phone:
 *               type: string
 *             country:
 *               type: string
 *             password:
 *               type: string
 *             gender:
 *               type: string
 *     responses:
 *       200:
 *         description: OK. El usuario ha sido creado con éxito.
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             surname:
 *               type: string
 *             nickname:
 *               type: string
 *             email:
 *               type: string
 *             dateOfBirth:
 *               type: string
 *             phone:
 *               type: string
 *             country:
 *               type: string
 *             gender:
 *               type: string
 *       400:
 *         description: El formato de usuario es incorrecto.
 *       500:
 *         description: Error interno del servidor.
 *     tags:
 *       - Usuarios
 */
    .post(ctrlUsers.postUsers);

router
    .route('/usersByEmail/:email')
/**
 * @swagger
 * /usersByEmail/{email}:
 *   get:
 *     summary: Obtiene un usuario por su dirección de correo electrónico
 *     description: Obtiene un usuario por su dirección de correo electrónico.
 *     parameters:
 *       - name: email
 *         in: path
 *         description: Dirección de correo electrónico del usuario a buscar.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: OK. El usuario ha sido encontrado con éxito.
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             surname:
 *               type: string
 *             nickname:
 *               type: string
 *             email:
 *               type: string
 *             dateOfBirth:
 *               type: string
 *             phone:
 *               type: string
 *             country:
 *               type: string
 *             gender:
 *               type: string
 *       404:
 *         description: No se ha encontrado ningún usuario con el correo electrónico especificado.
 *       500:
 *         description: Error interno del servidor.
 *     tags:
 *       - Usuarios
 */
    .get(ctrlUsers.verifyToken, ctrlUsers.getUsersByEmail);

router
    .route('/resetPasswordByEmail/:email')
/**
 * @swagger
 * /resetPasswordByEmail/{email}:
 *   post:
 *     summary: Restablecer la contraseña de un usuario por correo electrónico
 *     description: Restablece la contraseña de un usuario cuyo correo electrónico se proporciona.
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: El correo electrónico del usuario cuya contraseña se restablecerá.
 *     responses:
 *       200:
 *         description: OK. La contraseña del usuario se ha restablecido correctamente.
 *       404:
 *         description: No se encontró ningún usuario con el correo electrónico proporcionado.
 *       500:
 *         description: Error del servidor. Ha ocurrido un error al restablecer la contraseña del usuario.
 *     tags:
 *       - Usuarios
 */
    .post(ctrlUsers.verifyToken, ctrlUsers.resetPasswordByEmail);

router
    .route('/loginUsers')
/**
 * @swagger
 * /loginUsers:
 *   post:
 *     summary: Iniciar sesión de usuario.
 *     description: Iniciar sesión de usuario en la aplicación.
 *     parameters:
 *       - in: body
 *         name: user
 *         description: Credenciales de usuario.
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *               description: El email del usuario.
 *             password:
 *               type: string
 *               description: La contraseña del usuario.
 *     responses:
 *       200:
 *         description: OK. Inicio de sesión exitoso.
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               description: El estado de la respuesta.
 *             email:
 *               type: string
 *               description: El email del usuario.
 *             tokenUser:
 *               type: string
 *               description: El token de autenticación del usuario.
 *             tokenAdmin:
 *               type: string
 *               description: El token de autenticación del administrador.
 *       400:
 *         description: Solicitud incorrecta. El formato de usuario es incorrecto.
 *       401:
 *         description: No autorizado. Email o contraseña incorrectos.
 *       404:
 *         description: No encontrado. No se encontró el email proporcionado en la base de datos.
 *       500:
 *         description: Error del servidor. Ha ocurrido un error al iniciar sesión en el usuario.
 *     tags:
 *       - Usuarios 
 */
    .post(ctrlUsers.loginUsers);

router
    .route('/resetPassword')
/**
 * @swagger
 * /resetPassword:
 *   post:
 *     summary: Restablece la contraseña de un usuario
 *     description: Restablece la contraseña de un usuario mediante su ID y el token enviado a su email
 *     parameters:
 *       - in: body
 *         name: Reset password data
 *         description: Datos necesarios para restablecer la contraseña del usuario
 *         schema:
 *           type: object
 *           required:
 *             - id
 *             - token
 *             - password
 *           properties:
 *             id:
 *               type: string
 *               description: ID del usuario
 *             token:
 *               type: string
 *               description: Token enviado al correo del usuario
 *             password:
 *               type: string
 *               description: Nueva contraseña del usuario
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Contraseña restablecida correctamente
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Mensaje de éxito
 *       400:
 *         description: El formato de usuario es incorrecto
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Mensaje de error
 *       404:
 *         description: No se encontró ningún usuario con ese ID
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Mensaje de error
 *       500:
 *         description: Error interno del servidor
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Mensaje de error
 *     tags:
 *       - Usuarios 
 * 
 */
    .post(ctrlUsers.verifyToken, ctrlUsers.resetPassword);

router
    .route('/banUsers')
/**
 * @swagger
 *
 * /banUsers:
 *   post:
 *     summary: Banea a un usuario por email.
 *     description: Banea a un usuario por email en el sistema.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         in: body
 *         description: Email del usuario a banear.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *     responses:
 *       200:
 *         description: OK. El usuario ha sido baneado correctamente.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: El usuario ha sido baneado correctamente.
 *       404:
 *         description: No se ha podido eliminar/banear al usuario.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: No se ha podido eliminar/banear al usuario.
 *       500:
 *         description: Error interno del servidor.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Ocurrió un error al intentar borrar/banear al usuario. Por favor, inténtelo de nuevo más tarde.
 *     tags:
 *       - Administrador
 */
    .post(ctrlAdmin.verifyToken, ctrlUsers.banUsers)

/**
 * @swagger
 *
 * /banUsers:
 *   get:
 *     summary: Obtiene la lista de usuarios baneados
 *     description: Obtiene la lista de usuarios que han sido baneados del sistema.
 *     responses:
 *       200:
 *         description: Lista de usuarios baneados obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       404:
 *         description: No se ha encontrado ningún usuario baneado en el sistema.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No hemos encontrado ningún usuario baneado..."
 *     tags:
 *       - Administrador
 */
    .get(ctrlAdmin.verifyToken, ctrlUsers.getBannedUsers);

router
    .route('/unBanUsers')
/**
 * @swagger
 *
 * /unBanUsers:
 *   post:
 *     summary: Desbanea a un usuario
 *     description: Desbanea a un usuario utilizando su email.
 *     requestBody:
 *       description: Email del usuario a desbanear
 *       required: true
 *     parameters:
 *       - name: email
 *         in: body
 *         description: Email del usuario a desbanear.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *     responses:
 *       '200':
 *         description: Devuelve un objeto con la información del usuario desbaneado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       '404':
 *         description: No se ha podido desbanear al usuario con el email proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No se ha podido desbanear al usuario.
 *       '500':
 *         description: Ha ocurrido un error al intentar desbanear al usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ocurrió un error al intentar desbanear al usuario. Por favor, inténtelo de nuevo más tarde.
 *     tags:
 *       - Administrador
 */
    .post(ctrlAdmin.verifyToken, ctrlUsers.unBanUsers);

//Este es para el usuario
  router
    .route('/deleteUser')
/**
 * @swagger
 *
 * /deleteUser:
 *   post:
 *     summary: Se elimina a si mismo un usuario.
 *     description: Un usuario decide eliminarse la cuenta por si mismo.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         in: body
 *         description: Email del usuario a banear.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *     responses:
 *       200:
 *         description: OK. El usuario ha sido baneado correctamente.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: El usuario ha sido baneado correctamente.
 *       404:
 *         description: No se ha podido eliminar/banear al usuario.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: No se ha podido eliminar/banear al usuario.
 *       500:
 *         description: Error interno del servidor.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Ocurrió un error al intentar borrar/banear al usuario. Por favor, inténtelo de nuevo más tarde.
 *     tags:
 *       - Usuarios
 */
    .post(ctrlUsers.verifyToken, ctrlUsers.banUsers)

    
//Foro
router
  .route('/createTopics')
/**
 * @swagger
 *
 * /createTopics:
 *   post:
 *     summary: Crea un nuevo tema en el foro.
 *     description: Permite a un usuario crear un nuevo tema en el foro.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Información del nuevo tema a crear.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: email del usuario que crea el tema.
 *             title:
 *               type: string
 *               description: Título del tema.
 *             description:
 *               type: string
 *               description: Descripción del tema.
 *             iata:
 *               type: string
 *               description: Código IATA del aeropuerto relacionado con el tema.
 *             respuestas:
 *               type: array
 *               description: Lista de respuestas al tema (opcional).
 *               items:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK. El tema se ha creado correctamente.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: El tema se ha creado correctamente.
 *       404:
 *         description: No se ha podido crear el tema.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: No se ha podido crear el tema.
 *       500:
 *         description: Error interno del servidor.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Ocurrió un error al intentar crear el tema. Por favor, inténtelo de nuevo más tarde.
 *     tags:
 *       - Foro
 */
  .post(ctrlUsers.verifyToken, ctrlForo.createTopics);

router
  .route('/createAnswers')
/**
 * @swagger
 *
 * /createAnswers:
 *   post:
 *     summary: Crear una respuesta.
 *     description: Crea una nueva respuesta en un tema existente.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Datos de la respuesta a crear.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: email del usuario que crea la respuesta.
 *             topicId:
 *               type: string
 *               description: ID del tema en el que se está creando la respuesta.
 *             content:
 *               type: string
 *               description: Contenido de la respuesta.
 *     responses:
 *       200:
 *         description: OK. La respuesta ha sido creada correctamente.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: La respuesta ha sido creada correctamente.
 *       404:
 *         description: No se ha podido crear la respuesta.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: No se ha podido crear la respuesta.
 *       500:
 *         description: Error interno del servidor.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Ocurrió un error al intentar crear la respuesta. Por favor, inténtelo de nuevo más tarde.
 *     tags:
 *       - Foro
 */
  .post(ctrlUsers.verifyToken, ctrlForo.createAnswers);

router
  .route('/topics')
/**
 * @swagger
 *
 * /topics:
 *   get:
 *     summary: Recupera una lista de temas.
 *     description: Recupera una lista de temas.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK. La lista de temas ha sido recuperada correctamente.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: La lista de temas ha sido recuperada correctamente.
 *             data:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "Tema 1"
 *                   description:
 *                     type: string
 *                     example: "Descripción del tema 1"
 *                   iata:
 *                     type: string
 *                     example: "MAD"
 *                   respuestas:
 *                     type: integer
 *                     example: 3
 *       404:
 *         description: No se ha podido recuperar la lista de temas.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: No hemos encontrado ningún tema...
 *       500:
 *         description: Error interno del servidor.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Ocurrió un error al intentar recuperar la lista de temas. Por favor, inténtelo de nuevo más tarde.
 *     tags:
 *       - Foro
 */
  .get(ctrlUsers.verifyToken, ctrlForo.getTopics)

router
    .route('/getAnswersByTopic/:topicId')
/**
 * @swagger
 *
 * /getAnswersByTopic/{topicId}:
 *   get:
 *     summary: Recupera la lista de respuestas por id de tema.
 *     description: Recupera la lista de respuestas asociadas a un tema específico mediante su id.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: topicId
 *         in: path
 *         description: ID del tema para el cual se buscan las respuestas.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK. Se ha recuperado la lista de respuestas correctamente.
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID de la respuesta.
 *               userId:
 *                 type: integer
 *                 description: ID del usuario que ha creado la respuesta.
 *               topicId:
 *                 type: integer
 *                 description: ID del tema al que pertenece la respuesta.
 *               content:
 *                 type: string
 *                 description: Contenido de la respuesta.
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora de creación de la respuesta.
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora de última actualización de la respuesta.
 *       404:
 *         description: No se ha encontrado ningún tema con ese id.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: No hemos encontrado ningún tema con ese id...
 *       500:
 *         description: Error interno del servidor.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Error al recuperar las respuestas en la llamada a /api/getAnswersByTopic/{topicId}. Por favor, inténtelo de nuevo más tarde.
 *     tags:
 *       - Foro
 */
    .get(ctrlUsers.verifyToken, ctrlForo.getAnswersByTopic);

router
    .route('/getTopicsByIata/:iata')
/**
 * @swagger
 * /getTopicsByIata/{iata}:
 *   get:
 *     summary: Obtiene una lista de temas por código IATA.
 *     description: Obtiene una lista de temas relacionados con un código IATA específico.
 *     parameters:
 *       - in: path
 *         name: iata
 *         schema:
 *           type: string
 *         required: true
 *         description: Código IATA.
 *     responses:
 *       '200':
 *         description: Lista de temas recuperados correctamente.
 *       '404':
 *         description: No se han encontrado temas con el código IATA proporcionado.
 *     tags:
 *       - Foro
 */
    .get(ctrlUsers.verifyToken, ctrlForo.getTopicsByIata);

//AirLabs
router
    .route('/saveAirports')
/**
 * @swagger
 * /saveAirports:
 *   post:
 *     summary: Guarda el aeropuerto como favorito del usuario
 *     description: Permite guardar un aeropuerto como favorito de un usuario en la base de datos.
 *     tags:
 *       - Foro
 *     parameters:
 *       - in: body
 *         name: airport
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             iata:
 *               type: string
 *     responses:
 *       200:
 *         description: Se ha introducido correctamente el aeropuerto en la base de datos
 *       404:
 *         description: No se ha especificado el email o el IATA, o no se ha encontrado el usuario con ese email
 */
    .post(ctrlUsers.verifyToken, ctrlUsers.saveAirports);

router
    .route('/deleteFavAirport')
/**
 * @swagger
 * /deleteFavAirports:
 *   post:
 *     summary: Elimina un aeropuerto de la lista de favoritos de un usuario
 *     tags: [Foro]
 *     parameters:
 *       - in: body
 *         name: postdata
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: El email del usuario que quiere eliminar el aeropuerto de su lista de favoritos
 *             iata:
 *               type: string
 *               description: El IATA del aeropuerto que se quiere eliminar de la lista de favoritos del usuario
 *     responses:
 *       200:
 *         description: Se ha eliminado el aeropuerto de la lista de favoritos del usuario correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Un mensaje indicando que se ha eliminado el aeropuerto de la lista de favoritos del usuario
 *         example:
 *           message: Se ha eliminado correctamente el aeropuerto JFK como favorito del usuario usuario@ejemplo.com en la llamada a /api/deleteFavAirports
 *       400:
 *         description: Faltan campos en la petición
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Un mensaje indicando que faltan campos en la petición
 *             example:
 *               message: Faltan campos. Imposible eliminar
 *       404:
 *         description: No se ha encontrado el usuario o el aeropuerto especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Un mensaje indicando que no se ha encontrado el usuario o el aeropuerto especificado
 *             example:
 *               message: No hemos encontrado ningún usuario con ese email...
 */
    .post(ctrlUsers.verifyToken, ctrlUsers.deleteFavAirports);


//Métricas para mostrar a usuario
router
  .route('/getUsersByGenre')
/**
 * @swagger
 *
 * /getUsersByGenre:
 *   get:
 *     tags:
 *       - Métricas para administrador
 *     summary: Obtiene la lista de usuarios por género
 *     description: Este endpoint devuelve la lista de usuarios ordenada por género.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Lista de usuarios por género obtenida correctamente
 *       404:
 *         description: No se ha encontrado ningún usuario por género
 *       500:
 *         description: Error al obtener la lista de usuarios por género
 */
  .get(ctrlAdmin.verifyToken,ctrlUserMetrics.getUsersByGenre)

router
  .route('/getUsersBanned')
/**
 * @swagger
 * /getUsersBanned:
 *   get:
 *     summary: Obtiene una lista de usuarios baneados
 *     tags: 
 *       - Métricas para administrador
 *     responses:
 *       200:
 *         description: Lista de usuarios baneados
 *       400:
 *         description: No se pudo recuperar la lista de usuarios baneados
 *       500:
 *         description: Ha habido un error al recuperar la lista de usuarios baneados
 */
  .get(ctrlAdmin.verifyToken,ctrlUserMetrics.getBannedUsers)

router
  .route('/getUsersBannedByGenre')
/**
 * @swagger
 * /getUsersBannedByGenre:
 *   get:
 *     summary: Obtiene la lista de usuarios baneados por género
 *     tags: 
 *       - Métricas para administrador
 *     responses:
 *       '200':
 *         description: Lista de usuarios baneados por género
 *       '400':
 *         description: No se ha podido recuperar la lista de usuarios baneados por género
 *       '500':
 *         description: Ha habido un error al recuperar la lista de usuarios baneados por género
 */
  .get(ctrlAdmin.verifyToken,ctrlUserMetrics.getBannedUsersByGenre)

router
  .route('/getUsersByAgeRange')
/**
 * @swagger
 * /getUsersByAgeRange:
 *   get:
 *     summary: Recupera la lista de usuarios por rango de edad
 *     description: Recupera la lista de usuarios registrados en la aplicación dentro de un rango de edades específico.
 *     tags: [Métricas para administrador]
 *     responses:
 *       200:
 *         description: Lista de usuarios recuperada correctamente.
 *       400:
 *         description: No se ha podido recuperar la lista de usuarios por rango de edad.
 *       500:
 *         description: Error al recuperar la lista de usuarios por rango de edad.
 */
  .get(ctrlAdmin.verifyToken,ctrlUserMetrics.getUsersByAgeRange)

router
  .route('/getUsersByCountry')
/**
 * @swagger
 * /getUsersByCountry:
 *   get:
 *     summary: Recupera la lista de usuarios por pais de pertenencia
 *     description: Recupera la lista de usuarios registrados en la aplicación que pertenecen a un pais.
 *     tags: [Métricas para administrador]
 *     responses:
 *       200:
 *         description: Lista de usuarios recuperada correctamente.
 *       400:
 *         description: No se ha podido recuperar la lista de usuarios por pais.
 *       500:
 *         description: Error al recuperar la lista de usuarios por pais.
 */
  .get(ctrlAdmin.verifyToken,ctrlUserMetrics.getUsersByCountry)

router
  .route('/getUsersRegisteredByPeriod')
/**
 * @swagger
 * /getUsersRegisteredByPeriod:
 *   get:
 *     summary: Retorna una lista de usuarios registrados por periodo de tiempo
 *     description: Retorna una lista de usuarios registrados en un periodo de tiempo especificado por el usuario.
 *     tags: [Métricas para administrador]
 *     responses:
 *       200:
 *         description: Lista de usuarios registrados por periodo de tiempo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *         description: No se pudo recuperar la lista de usuarios registrados por periodo de tiempo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
  .get(ctrlAdmin.verifyToken, ctrlUserMetrics.getUsersRegisteredByPeriod)

//Stats for users
router
  .route('/getUsersByCountryForUsers')
/**
 * @swagger
 * /getUsersByCountryForUsers:
 *   get:
 *     summary: Obtiene la lista de usuarios por país
 *     tags: [Metricas para usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios por país obtenida correctamente
 *       400:
 *         description: No se ha podido recuperar la lista de usuarios por país
 */
  .get(ctrlUsers.verifyToken, ctrlUsers.getUsersByCountryForUsers)

router
  .route('/getAirportsByNumberOfSaves')
/**
 * @swagger
 * /getAirportsByNumberOfSaves:
 *   get:
 *     summary: Retorna una lista de aeropuertos ordenados por número de veces que han sido guardados como favoritos por los usuarios.
 *     tags: 
 *       - Metricas para usuarios
 *     responses:
 *       200:
 *         description: Lista de aeropuertos ordenados por número de veces que han sido guardados como favoritos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   airportCode:
 *                     type: string
 *                     description: El código del aeropuerto.
 *                   airportName:
 *                     type: string
 *                     description: El nombre del aeropuerto.
 *                   numberOfSaves:
 *                     type: integer
 *                     description: El número de veces que ha sido guardado como favorito.
 *       400:
 *         description: No se ha podido recuperar la lista de aeropuertos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 */
  .get(ctrlUsers.verifyToken, ctrlUsers.getAirportsByNumberOfSaves)

router
  .route('/getFlightsEachDay/:iata')
/**
 * @swagger
 * /getFlightsEachDay/{iata}:
 *   get:
 *     summary: Obtiene los vuelos llegados y salientes al aeropuerto indicado por día.
 *     tags: [Metricas para usuarios]
 *     parameters:
 *       - in: path
 *         name: iata
 *         schema:
 *           type: string
 *         required: true
 *         description: Código IATA del aeropuerto.
 *     responses:
 *       200:
 *         description: Lista de vuelos llegados y salientes al aeropuerto por día.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     description: Fecha de los vuelos en formato YYYY-MM-DD.
 *                   flights:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         airline:
 *                           type: string
 *                           description: Nombre de la aerolínea.
 *                         flight_number:
 *                           type: string
 *                           description: Número de vuelo.
 *                         origin:
 *                           type: string
 *                           description: Código IATA del aeropuerto de origen.
 *                         scheduled_arrival:
 *                           type: string
 *                           description: Hora de llegada programada en formato HH:MM.
 *                         actual_arrival:
 *                           type: string
 *                           description: Hora de llegada real en formato HH:MM.
 *                         status:
 *                           type: string
 *                           description: Estado del vuelo.
 *       400:
 *         description: No se han podido obtener los vuelos llegados al aeropuerto.
 *       500:
 *         description: Error en el servidor.
 */
.get(ctrlUsers.verifyToken, ctrlAirportsMetrics.getFlightsEachDay);


module.exports = router;
        