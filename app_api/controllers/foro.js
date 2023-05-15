const Answers = require('../models/answers');
const Users = require('../models/users');
const Topics = require('../models/topics');

//const clientURL = "http://localhost:3000";
//const clientURL = "https://flytrax-backend.vercel.app"
const clientURL = "flytrax-backend-production.up.railway.app"
/* CREATE TOPICS */

const createTopics = async (req, res) => {

  email = req.body.email
  description = req.body.description
  respuestas = req.body.respuestas
  iata = req.body.iata

  //Conseguir el nickname
  const user = await Users.findOne({ email: email });
  const nickname = user.nickname;

  const postData = {
    email: email,
    description: description,
    iata: iata,
    respuestas: respuestas,
    nickname:nickname
  }


  console.log(postData)
  Topics.create(postData, function (results) {

    res.status(200).json({
      "status": "Creado correctamente",
      "email": email,
      "nickname": nickname,
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

    //Conseguir el nickname
    const user = await Users.findOne({ email: email });
    const nickname = user.nickname;

  const postData = {
    email: email,
    topicId: topicId,
    content: content,
    nickname:nickname

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
      "nickname": nickname
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
