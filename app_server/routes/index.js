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

//Airports Metrics
router
    .route('/getFlightsEachDay/:iata')
    .get(ctrlUsers.verifyToken, ctrlAirportsMetrics.getFlightsEachDay);

    
//Foro
router
  .route('/createTopics')
  .post(ctrlUsers.verifyToken, ctrlForo.createTopics);

router
  .route('/createAnswers')
  .post(ctrlUsers.verifyToken, ctrlForo.createAnswers);

router
  .route('/topics')
  .get(ctrlUsers.verifyToken, ctrlForo.getTopics)

router
    .route('/getAnswersByTopic/:topicId')
    .get(ctrlUsers.verifyToken, ctrlForo.getAnswersByTopic);

router
    .route('/getTopicsByIata/:iata')
    .get(ctrlUsers.verifyToken, ctrlForo.getTopicsByIata);

//AirLabs
router
    .route('/saveAirports')
    .post(ctrlUsers.verifyToken, ctrlUsers.saveAirports);

router
    .route('/deleteFavAirport')
    .post(ctrlUsers.verifyToken, ctrlUsers.deleteFavAirports);


//User Metrics
router
  .route('/getUsersByGenre')
  .get(ctrlAdmin.verifyToken,ctrlUserMetrics.getUsersByGenre)

router
  .route('/getUsersBanned')
  .get(ctrlAdmin.verifyToken,ctrlUserMetrics.getBannedUsers)

router
  .route('/getUsersBannedByGenre')
  .get(ctrlAdmin.verifyToken,ctrlUserMetrics.getBannedUsersByGenre)

router
  .route('/getUsersByAgeRange')
  .get(ctrlAdmin.verifyToken,ctrlUserMetrics.getUsersByAgeRange)

router
  .route('/getUsersByCountry')
  .get(ctrlAdmin.verifyToken,ctrlUserMetrics.getUsersByCountry)

router
  .route('/getUsersRegisteredByPeriod')
  .get(ctrlAdmin.verifyToken, ctrlUserMetrics.getUsersRegisteredByPeriod)

//Stats for users
router
  .route('/getUsersByCountryForUsers')
  .get(ctrlUsers.verifyToken, ctrlUsers.getUsersByCountryForUsers)

router
  .route('/getAirportsByNumberOfSaves')
  .get(ctrlUsers.verifyToken, ctrlUsers.getAirportsByNumberOfSaves)


module.exports = router;
        