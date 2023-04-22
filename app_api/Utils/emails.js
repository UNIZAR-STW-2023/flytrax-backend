const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {
    try {
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          auth: {
            user: "flytrax.info@gmail.com",
            //pass: "SergioBernal_JorgeHernandez_stw_2023",
            pass: "kmdmbhddssnuahyk"
            
          },
        });
      

        
        const source = fs.readFileSync(path.join(__dirname, template), "utf8");
        const compiledTemplate = handlebars.compile(source);
      

        
        const options = () => {
          return {
            from: "flytrax.info@gmail.com",
            to: email,
            subject: subject,
            html: compiledTemplate(payload),
          };
        };
      

        
        transporter.sendMail(options(), (error, info) => {
          if (error) {

          } else {

          }
        });
      } catch (error) {

      }
};

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/email_template.handlebars"
);
*/

module.exports = sendEmail;