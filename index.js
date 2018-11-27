// packages
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const nodemailer = require("nodemailer");
const excel = require("excel4node");
const nib = require("nib");
const stylus = require("stylus");
const validator = require("validator");
const centralstation = require("./modules/centralstation");
const { Person, Company, Project } = require("./modules/centralstation");

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

// register regular person
app.get("/register", (req, res) => {
  const newPerson = {
    first_name: "Marian",
    name: "Miller",
    email: "marian@miller.de"
  };
  var person = new Person();
  person
    .addPerson(newPerson)
    .then((p) => {
      console.log(p);
    })
    .catch((e) => {
      console.log(e);
    });
});

app.get("/nsend", (req, res) => {
  const email = req.query.email; // get form information
  const type = req.query.type; // get user type

  if (!validator.isEmail(email))
    return res.status(500).send("Keine gültige elektronische Postadresse");

  let transporter = nodemailer.createTransport({
    host: config.mail.host,
    port: config.mail.port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.mail.absender,
      pass: config.mail.passwort
    },
    tls: {
      rejectUnauthorized: false // just for local environment
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: `"Newsletter" <${config.mail.absender}> - ${type}`, // sender address
    to: config.mail.empfaenger, // list of receivers
    subject: config.mail.betreff, // Subject line
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

/* jshint ignore:start */
// listen
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
/* jshint ignore:end */
