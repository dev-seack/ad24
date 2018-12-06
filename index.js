// packages
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const join = require("path").join;
const excel = require("excel4node");
const nib = require("nib");
const validator = require("validator");
const moment = require("moment");
const formidable = require("formidable");
const util = require("util");
const publicDir = join(__dirname, "/public");

const { Person, Company } = require("./modules/centralstation");

// port
const PORT = process.env.PORT || 3000;

// config
const { mail } = require("./config.js");

// category
const categories = require("./categories.json").main_categories;

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
    title: "Handwerker finden",
    categories: categories,
    today: moment().format("YYYY-MM-DD"),
    inOneWeek: moment()
      .day(7)
      .format("YYYY-MM-DD")
  });
});

app.get("/company", (req, res) => {
  res.render("company", { title: "Auftrag suchen" });
});

app.post("/regperson", (req, res) => {
  // parse a file upload
  var form = new formidable.IncomingForm();

  form.uploadDir = __dirname + "/tmp/form";
  form.parse(req, function(err, fields, files) {
    const data = {
      person: {
        first_name: fields.firstname || "",
        name: fields.lastname || "",
        emails_attributes: [
          {
            name: fields.emaail || "",
            atype: "office"
          }
        ],
        tels_attributes: [
          {
            name: fields.phone || "",
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
            zip: fields.plz || "",
            city: fields.city || ""
          }
        ],
        custom_fields_attributes: [
          {
            custom_fields_type_id: 1,
            attachable_id: "",
            attachable_type: "Person",
            name: fields.mainCat || ""
          },
          {
            custom_fields_type_id: 2,
            attachable_id: "",
            attachable_type: "Person",
            name: fields.secCat || ""
          }
        ],
        form_content: fields.description || ""
      }
    };

    // convert 'files' object to array,
    // containing only the props that start with 'file'
    const attachmentProps = Object.getOwnPropertyNames(files).filter((prop) =>
      prop.startsWith("file")
    );
    const attachments = attachmentProps.map(function(key) {
      return files[key];
    });

    var person = new Person();
    person
      .addPerson(data, attachments)
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
});

// Register a Company
app.post("/regcompany", (req, res) => {
  // parse a file upload
  var form = new formidable.IncomingForm();

  form.uploadDir = __dirname + "/tmp/form";
  form.parse(req, function(err, fields, files) {
    const data = {
      company: {
        name: fields.companyname,
        emails_attributes: [
          {
            name: fields.email,
            atype: "office"
          }
        ],
        tags_attributes: [
          {
            name: "Online"
          }
        ],
        tels_attributes: [
          {
            name: fields.phone || "",
            atype: "office"
          }
        ],
        addrs_attributes: [
          {
            street: fields.address || "",
            zip: fields.plz || "",
            city: fields.city || ""
          }
        ],
        custom_fields_attributes: [
          {
            custom_fields_type_id: 31290,
            name:
              (fields.firstname || "Herr/Frau") +
              " " +
              (fields.lastname || "[Nachname]")
          },
          {
            custom_fields_type_id: 31293,
            name: fields.inputLegalform || ""
          },
          {
            custom_fields_type_id: 31296,
            name: fields.inputJob || ""
          }
        ],
        form_content: "Online registriert"
      }
    };

    // convert 'files' object to array,
    // containing only the props that start with 'file'
    const attachmentProps = Object.getOwnPropertyNames(files).filter((prop) =>
      prop.startsWith("file")
    );
    const attachments = attachmentProps.map(function(key) {
      return files[key];
    });
    var company = new Company();
    company
      .addCompany(data, attachments)
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
        res.status(500).send(e);
      });
  });
});

// Newsletter
app.get("/nsend", (req, res) => {
  const email = req.query.email; // get form information
  const type = req.query.type; // get user type

  if (!validator.isEmail(email))
    return res.status(500).send("Keine gültige elektronische Postadresse");

  let transporter = nodemailer.createTransport({
    host: mail.host,
    port: mail.port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: mail.absender,
      pass: mail.passwort
    },
    tls: {
      rejectUnauthorized: false // just for local environment
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: `"Newsletter" <${mail.absender}> - ${type}`, // sender address
    to: mail.empfaenger, // list of receivers
    subject: mail.betreff, // Subject line
    text: `Ein Benutzer hat eine Nachricht gesendet. Betreff: ${type} Erreiche ihn unter: ${email}`,
    html: `<p>Ein Benutzer hat eine Nachricht gesendet.</p><p>Betreff: <b>${type}</b></p><p>Erreiche ihn unter: ${email}</p>`
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
