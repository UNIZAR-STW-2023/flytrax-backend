/*
  File's name: app.js
  Authors: Sergio Hernández & Jorge Bernal 
  Date: 16/05/2023
*/

var createError = require("http-errors");
var express = require("express");

var path = require("path");
var cookieParser = require("cookie-parser");
var lessMiddleware = require("less-middleware");
var logger = require("morgan");
require("./app_api/models/db");

const cors = require("cors");
const https = require("https");
const fs = require("fs");

const PORT = 8000;

const index = require("./app_server/routes/index");
const apiRoutes = require("./app_api/routes/index");

//API documentation
var swaggerJSDoc = require('swagger-jsdoc');

var app = express();

// swagger definition
var swaggerDefinition = {
  info: {
    title: 'API de Flytrax',
    version: '1.0.0',
    description: 'Descripción de la API del proyecto Flytrax'
  },
  host: 'flytrax-backend.vercel.app',
  basePath: '/',
  schemes: ['https']
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions 
  swaggerDefinition: swaggerDefinition, 
  securityDefinitions: {
    BearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  // path to the API docs
  apis: ['./app_server/routes/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});


//Función para el home
app.get("/", (req, res) => {
  res.send("Flytrax backend runnnnnning!");
});

// View engine setup
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "hbs");

app.use(express.static('public/stylesheets'));

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index); 
app.use("/api", apiRoutes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//NO FUNCIONA TODAVIA CORRECTAMENTE (creo que no entra en la certRenewer.js)
const renewCert = require("./security/certRenewer");
// Check for certificate expiration and renew it if necessary every 24 hours
setInterval(renewCert, 24 * 60 * 60 * 1000);

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.resolve("./security/key.pem")),
    cert: fs.readFileSync(path.resolve("./security/cert.pem")),
  },
  app
);

sslServer.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

module.exports = app;
