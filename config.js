var isHeroku = process.env.NODE_HEROKU || false;
var config = {};
if (!isHeroku) {
  config = require("./config.json");
} else {
  config = {
    mail: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      absender: process.env.MAIL_SENDER,
      passwort: process.env.MAIL_PASSWORD,
      empfaenger: process.env.MAIL_RECEIVER,
      betreff: process.env.MAIL_SUBJECT
    },
    crm: {
      BASE_URL: process.env.CRM_BASE_URL,
      API_KEY: process.env.CRM_API_KEY
    }
  };
}

module.exports = { mail: config.mail, crm: config.crm };
