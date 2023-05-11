const axios = require("axios");
const logger = require('../utils/logger');



const apiOptions = {
  //server: "http://localhost:3000",
  server : 'https://flytrax-backend.vercel.app' 
};
/* CREATE TOPICS */
const createTopics = function (req, res) {
  const path = "/api/createTopics";
  const url = apiOptions.server + path;

  const postdata = {
    email: req.body.email,
    description: req.body.description,
    iata: req.body.iata,
    respuestas: req.body.respuestas
  };
  console.log(postdata)

  axios
    .post(url, postdata)
    .then((response) => {
      if (response.data) {
        logger.info(`Se ha creado el tema correctamente en la llamada a ${path}`);
        res.status(200).json(response.data);
      } else {
        logger.warn(`No se ha podido crear el tema en la llamada a ${path}`);
        res
          .status(404)
          .send("No se ha podido crear el tema");
      }
    })
    .catch((error) => {
      logger.error(`Error al crear el tema en la llamada a ${path}: ${error}`);
    });
};

/* CREATE ANSWERS */
const createAnswers = function (req, res) {
  const path = "/api/createAnswers";
  const url = apiOptions.server + path;

  email = req.body.email
  topicId = req.body.topicId
  content = req.body.content

  const postData = {
    email: email,
    topicId: topicId,
    content: content,
  }

  axios
    .post(url, postData)
    .then((response) => {
      if (response.data) {
        logger.info(`Se ha creado la respuesta correctamente en la llamada a ${path}`);
        res.status(200).json(response.data);
      } else {
        logger.warn(`No se ha podido crear la respuesta en la llamada a ${path}`);
        res
          .status(404)
          .send("No se ha podido crear la respuesta");
      }
    })
    .catch((error) => {
      logger.error(`Error al crear la respuesta en la llamada a ${path}: ${error}`);

    });
};

/* GET users */
const getTopics = function (req, res) {
  const path = "/api/topics";
  const url = apiOptions.server + path;

  axios.get(url, {}).then((response) => {
    if (response.data) {
      logger.info(`Se ha recuperado la lista de temas correctamente en la llamada a ${path}`);
      res.status(200).json(response.data);
    } else {
      logger.warn(`No se ha podido recuperar la lista de temas correctamente en la llamada a ${path}`);
      res.status(404).send("No hemos encontrado ningún tema...");
    }
  });
};

/* GET users BY email*/
const getAnswersByTopic = function (req, res) {
  const path = `/api/getAnswersByTopic/${req.params.topicId}`;
  const url = apiOptions.server + path;

  axios
    .get(url, {})
    .then((response) => {
      if (response.data) {
        logger.info(`Se ha recuperado la lista de respuestas correctamente en la llamada a ${path}`);
        res.status(200).json(response.data);
      } else {
        logger.warn(`No se ha podido recuperar la lista de respuestas correctamente en la llamada a ${path}`);
        res
          .status(404)
          .send("No hemos encontrado ningún tema con ese id...");
      }
    })
    .catch((error) => {
      logger.error(`Error al recuperar las respuestas en la llamada a ${path}: ${error}`);
    });
};

/* GET topics BY iata*/
const getTopicsByIata = function (req, res) {
  const path = `/api/getTopicsByIata/${req.params.iata}`;
  const url = apiOptions.server + path;

  axios
    .get(url, {})
    .then((response) => {
      if (response.data) {
        logger.info(`Se ha recuperado la lista de respuestas correctamente en la llamada a ${path}`);
        res.status(200).json(response.data);
      } else {
        logger.warn(`No se ha podido recuperar la lista de respuestas correctamente en la llamada a ${path}`);
        res
          .status(404)
          .send("No hemos encontrado ningún tema con ese id...");
      }
    })
    .catch((error) => {
      logger.error(`Error al recuperar las respuestas en la llamada a ${path}: ${error}`);
    });
};

module.exports = {
  createTopics,
  createAnswers,
  getTopics,
  getAnswersByTopic,
  getTopicsByIata
};
