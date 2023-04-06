const mongoose = require("mongoose");

//Para que lance al menos la pantalla '/' en vercel habría que ponerle 'var dbURI'
// const dbURI =
//   'mongodb+srv://flytrax-admin:bernalhernandez_stw@flytrax-db.eox4ruo.mongodb.net/flytrax-main-db?retryWrites=true&w=majority';

var dbURI =
  'mongodb+srv://flytrax-admin:bernalhernandez_stw@flytrax-db.eox4ruo.mongodb.net/flytrax-main-db?retryWrites=true&w=majority';


if (process.env.NODE_ENV === "production") {
  dbURI = process.env.MONGODB_URI;
}

mongoose.set("strictQuery", true);
// mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});

console.log(`About to connect to ${dbURI}`);

// Conectar a la base de datos
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Mongoose connected to ${dbURI}`);
  })
  .catch((error) => {
    console.error("Mongoose connection error:", error);
  });

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

// For nodemon restarts
process.once("SIGUSR2", () => {
  gracefulShutdown("nodemon restart", () => {
    process.kill(process.pid, "SIGUSR2");
  });
});
// For app termination
process.on("SIGINT", () => {
  gracefulShutdown("app termination", () => {
    process.exit(0);
  });
});
// For Heroku app termination
process.on("SIGTERM", () => {
  gracefulShutdown("Heroku app shutdown", () => {
    process.exit(0);
  });
});

require("./users");
require("./token");

module.exports ={
   dbURI :'mongodb+srv://flytrax-admin:bernalhernandez_stw@flytrax-db.eox4ruo.mongodb.net/flytrax-main-db?retryWrites=true&w=majority'
}
