// packages
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const nodemailer = require("nodemailer");
const excel = require("excel4node");
const nib = require("nib");
const stylus = require("stylus");
const validator = require("validator");

// hallo

// port
const PORT = 3000;

// config
const config = require("./config.json");

const app = express();

// set view engine
app.set("views", __dirname + "/views");
app.set("view engine", "pug");

// bodyparser
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static("public"));
//stylus
app.use(
  stylus.middleware({
    src: __dirname + "/public",
    compile: (str, path) =>
      stylus(str)
        .set("filename", path)
        .use(nib())
  })
);

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/nsend", (req, res) => {
  const email = req.query.email; // get form information
  const type = req.query.type; // get user type

  //return console.log(type, email);

  if (!validator.isEmail(email))
    return res.status(500).send("Keine gültige elektronische Postadresse");

  let transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.absender,
      pass: config.passwort
    },
    tls: {
      rejectUnauthorized: false // just for local environment
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: `"Newsletter" <${config.absender}> - ${type}`, // sender address
    to: config.empfaenger, // list of receivers
    subject: config.betreff, // Subject line
    text: `Ein Benutzer (${type}) hat sich angemeldet. Erreiche ihn unter: ${email}`,
    html: `<p>Ein Benutzer <b>(${type})</b> hat sich angemeldet.</p><p>Erreiche ihn unter: ${email}</p>`
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }

    // rerender contactform with successmessage
    res.render("index", { msg: "Erfolgreich abgesendet!", title: "Home" });
  });
});

// listen
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
