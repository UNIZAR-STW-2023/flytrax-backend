/*
  File's name: emails.js
  Authors: Sergio Hernández & Jorge Bernal 
  Date: 16/05/2023
*/

const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {
  console.log("Entro a mandar el email");
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: "flytrax.info@gmail.com",
        pass: "dnakqouwwlboaviy"
      }
    });

    const html = fs.readFileSync(path.join(__dirname, template), "utf8");

    const options = {
      from: "flytrax.info@gmail.com",
      to: email,
      subject: subject,
      html: html.replace(/{{(\w+)}}/g, (_, prop) => payload[prop])
    };

    transporter.sendMail(options, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
