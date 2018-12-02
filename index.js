// packages
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const join = require("path").join;
const excel = require("excel4node");
const nib = require("nib");
const validator = require("validator");
const moment = require("moment");

const publicDir = join(__dirname, "/public");

const { Person, Company } = require("./modules/centralstation");

// port
const PORT = process.env.PORT || 3000;

// config
const config = require("./config.json");

const app = express();

// set view engine
app.set("views", __dirname + "/views");
app.set("view engine", "pug");

// bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(publicDir));

// Pages
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/person", (req, res) => {
  res.render("person", {
    today: moment().format("YYYY-MM-DD"),
    inOneWeek: moment()
      .day(7)
      .format("YYYY-MM-DD")
  });
});

// Register a Person
app.get("/regperson", (req, res) => {
  const person_template = {
    person: {
      first_name: "Marian",
      name: "Miller",
      emails_attributes: [
        {
          name: "marian@miller.de",
          atype: "office"
        }
      ],
      tels_attributes: [
        {
          name: "123456789",
          atype: "office"
        }
      ],
      tags_attributes: [
        {
          name: "Online"
        },
        {
          name: "Privat"
        }
      ],
      addrs_attributes: [
        {
          zip: "59192",
          city: "Bergkamen"
        }
      ],
      custom_fields_attributes: [
        {
          custom_fields_type_id: 1,
          attachable_id: "",
          attachable_type: "Person",
          name: "Oberkategorie"
        },
        {
          custom_fields_type_id: 2,
          attachable_id: "",
          attachable_type: "Person",
          name: "Unterkategorie"
        }
      ],
      form_content: "this is a short description"
    }
  };
  var person = new Person();
  person
    .addPerson(person_template)
    .then((response) => {
      if (response.message !== undefined) {
        res.status(404).send(response.message);
      } else {
        res
          .status(200)
          .send({ Person: response.Person, Protocol: response.Protocol });
      }
    })
    .catch((e) => {
      res.send(e);
    });
});

// Register a Company
app.get("/regcompany", (req, res) => {
  const company_template = {
    company: {
      name: "Miller AG",
      emails_attributes: [
        {
          name: "marian@miller.de",
          atype: "office"
        }
      ],
      tags_attributes: [
        {
          name: "Online"
        }
      ],
      form_content: "Bilder Registrierung"
    }
  };
  var company = new Company();
  company
    .addCompany(company_template)
    .then((response) => {
      if (response.message !== undefined) {
        res.status(404).send(response.message);
      } else {
        res
          .status(200)
          .send(
            { Company: response.Company, Protocol: response.Protocol } ||
              response
          );
      }
    })
    .catch((e) => {
      res.send(e);
    });
});

// Newsletter
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
