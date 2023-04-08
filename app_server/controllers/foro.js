const axios = require("axios");


const apiOptions = {
  server: "http://localhost:3000",
  /* server : 'https://flytraxserver-758723.b4a.run' */
};

/* CREATE TOPICS */
const createTopics = function (req, res) {
  const path = "/api/createTopics";
  const url = apiOptions.server + path;

  const postdata = {
    userId: req.body.id,
    title: req.body.title,
    description: req.body.description,
    date: req.body.date
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


module.exports = {
  createTopics
};
