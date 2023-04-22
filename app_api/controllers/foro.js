const Answers = require('../models/answers');
const Topics = require('../models/topics');
const { ObjectId } = require('mongodb');

//const clientURL = "http://localhost:3000";
//const clientURL = "https://flytraxserver-758723.b4a.run";
const clientURL = "https://flytrax-backend.vercel.app"

/* CREATE TOPICS */

const createTopics = async (req, res) => {


  userId = req.body.userId
  title = req.body.title
  description = req.body.description
  respuestas = req.body.respuestas

  const postData = {
    userId: userId,
    title: title,
    description: description,
    respuestas: respuestas
  }
  Topics.create(postData, function (results) {
    res.status(200).json({
      "status": "Creado correctamente",
      "userId": userId,
      "title": title,
      "description": description,
      "respuestas": respuestas
    });
  });
  
};

const createAnswers = async (req, res) => {



  userId = req.body.userId
  topicId = req.body.topicId
  content = req.body.content

  const postData = {
    userId: userId,
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
      "userId": userId,
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


module.exports = {
  createTopics,
  createAnswers,
  getTopics,
  getAnswersByTopic
};
