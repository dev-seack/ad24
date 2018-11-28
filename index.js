// packages
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const nodemailer = require("nodemailer");
const excel = require("excel4node");
const nib = require("nib");
const stylus = require("express-stylus");
const validator = require("validator");

const centralstation = require("./modules/centralstation");

const join = require("path").join;
const publicDir = join(__dirname, "/public");

const { Person, Company } = require("./modules/centralstation");

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

app.use(
  stylus({
    src: publicDir + "/stylus",
    use: [nib()],
    import: ["nib"]
  })
);
app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// register regular person
app.get("/regperson", (req, res) => {
  const newPerson = {
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
      ]
    }
  };
  var person = new Person();
  person
    .addPerson(newPerson)
    .then((p) => {
      res.send(JSON.stringify(p));
    })
    .catch((e) => {
      res.send(e);
    });
});

app.get("/regcompany", (req, res) => {
  const newCompany = {
    company: {
      name: "Miller AG",
      emails_attributes: [
        {
          name: "marian@miller.de",
          atype: "office"
        }
      ]
    }
  };
  var company = new Company();
  company
    .addCompany(newCompany)
    .then((p) => {
      res.send(JSON.stringify(p));
    })
    .catch((e) => {
      res.send(e);
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
