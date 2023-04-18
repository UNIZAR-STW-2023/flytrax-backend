const axios = require("axios");


const apiOptions = {
  server: "http://localhost:3000",
  //server : 'https://flytrax-backend.vercel.app' 
};
/* CREATE TOPICS */
const createTopics = function (req, res) {
  const path = "/api/createTopics";
  const url = apiOptions.server + path;

  const postdata = {
    userId: req.body.id,
    title: req.body.title,
    description: req.body.description,
    respuestas: req.body.respuestas
  };
  console.log(postdata)

  axios
    .post(url, postdata)
    .then((response) => {
      if (response.data) {
        res.status(200).json(response.data);
      } else {
        res
          .status(404)
          .send("No se ha podido crear el tema");
      }
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`);
    });
};

/* CREATE ANSWERS */
const createAnswers = function (req, res) {
  const path = "/api/createAnswers";
  const url = apiOptions.server + path;

  userId = req.body.userId
  topicId = req.body.topicId
  content = req.body.content

  const postData = {
    userId: userId,
    topicId: topicId,
    content: content,
  }

  axios
    .post(url, postData)
    .then((response) => {
      if (response.data) {
        res.status(200).json(response.data);
      } else {
        res
          .status(404)
          .send("No se ha podido crear la respuesta");
      }
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`);
    });
};

/* GET users */
const getTopics = function (req, res) {
  const path = "/api/topics";
  const url = apiOptions.server + path;

  axios.get(url, {}).then((response) => {
    if (response.data) {
      res.status(200).json(response.data);
    } else {
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
        res.status(200).json(response.data);
      } else {
        res
          .status(404)
          .send("No hemos encontrado ningún tema con ese id...");
      }
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`);
    });
};

module.exports = {
  createTopics,
  createAnswers,
  getTopics,
  getAnswersByTopic
};
