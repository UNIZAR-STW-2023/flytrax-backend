const Topics = require('../models/topics');


const clientURL = "http://localhost:3000";
// const clientURL = "https://flytraxserver-758723.b4a.run";

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

module.exports = {
  createTopics
};
