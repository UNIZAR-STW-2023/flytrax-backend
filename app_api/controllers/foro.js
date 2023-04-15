const Answers = require('../models/answers');
const Topics = require('../models/topics');
const { ObjectId } = require('mongodb');


//const clientURL = "http://localhost:3000";
// const clientURL = "https://flytraxserver-758723.b4a.run";
const clientURL = "https://flytrax-backend.vercel.app"

/* CREATE TOPICS */

const createTopics = async (req, res) => {
  console.log("Voy a entrar a guardar un tema brother")
  console.log(req.body.title);
  console.log(req.body.description);
  console.log(req.body.date)

  userId = req.body.userId
  title = req.body.title
  description = req.body.description
  date = req.body.date

  const postData = {
    userId: userId,
    title: title,
    description: description,
    date: date
  }
  Topics.create(postData, function (results) {
    res.status(200).json({
      "status": "Creado correctamente",
      "userId": userId,
      "title": title,
      "description": description,
      "date": date
    });
  });
  
};

const createAnswers = async (req, res) => {
  console.log("Voy a entrar a guardar una respuesta brother")
  console.log(req.body.userId);
  console.log(req.body.topicId);
  console.log(req.body.content)
  console.log(req.body.date)


  userId = req.body.userId
  topicId = req.body.topicId
  content = req.body.content
  date = req.body.date

  const postData = {
    userId: userId,
    topicId: topicId,
    content: content,
    date: date
  }

  try {
    // Crear la respuesta
    await Answers.create(postData);
    // Actualizar el tema
    await Topics.updateOne({_id: ObjectId(topicId)}, {$inc: {"n_answers": 1}});
    // Responder al cliente
    res.status(200).json({
      "status": "Respondido correctamente",
      "userId": userId,
      "topicId": topicId,
      "content": content,
      "date": date
    });
  } catch (error) {
    console.error(`Ocurrió un error al guardar la respuesta: ${error}`);
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
  console.log("Me meto a buscar las respuestas")
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
