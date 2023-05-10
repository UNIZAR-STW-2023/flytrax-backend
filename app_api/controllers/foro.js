const Answers = require('../models/answers');
const Topics = require('../models/topics');

//const clientURL = "http://localhost:3000";
const clientURL = "https://flytrax-backend.vercel.app"

/* CREATE TOPICS */

const createTopics = async (req, res) => {

console.log("Entro a crear el topico craack")
  email = req.body.email
  title = req.body.title
  description = req.body.description
  respuestas = req.body.respuestas
  iata = req.body.iata

  const postData = {
    email: email,
    title: title,
    description: description,
    iata: iata,
    respuestas: respuestas
  }
  console.log(postData)
  Topics.create(postData, function (results) {

    res.status(200).json({
      "status": "Creado correctamente",
      "email": email,
      "title": title,
      "description": description,
      "iata": iata,
      "respuestas": respuestas
    });
  });
  
};

const createAnswers = async (req, res) => {
  email = req.body.email
  topicId = req.body.topicId
  content = req.body.content

  const postData = {
    email: email,
    topicId: topicId,
    content: content,
  }

  try {
    // Crear la respuesta
    const answer = await Answers.create(postData);
    
    // Actualizar el tema
    const topic = await Topics.findById(topicId);
    
    topic.respuesta.push(answer._id);
    
    // Guardar el tema actualizado
    await topic.save();
  
    // Responder al cliente
    res.status(200).json({
      "status": "Respondido correctamente",
      "email": email,
      "topicId": topicId,
      "content": content,
    });
  } catch (error) {
    res.status(500).json({
      "status": "Error al guardar la respuesta"
    });
  }
};

const getTopics = function (req, res) {
  Topics.find({}).then(function (results) {
    res.status(200).json(results);
  });
};

const getAnswersByTopic = function (req, res) {
  const Topic = {
    topicId: req.params.topicId,
  };
  Answers.find(Topic).then(function (results) {
    res.status(200).json(results);
  });
};

const getTopicsByIata = function (req, res) {
  const Iata = {
    iata: req.params.iata,
  };
  Topics.find(Iata).then(function (results) {
    res.status(200).json(results);
  });
};


module.exports = {
  createTopics,
  createAnswers,
  getTopics,
  getAnswersByTopic,
  getTopicsByIata
};
