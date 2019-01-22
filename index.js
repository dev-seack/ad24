// packages
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const join = require("path").join;
const validator = require("validator");
const moment = require("moment");
const formidable = require("formidable");
const publicDir = join(__dirname, "/public");
const minify = require("express-minify");
const compression = require("compression");

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

app.use(compression());
app.use(minify());
app.use(express.static(publicDir));

// Pages
app.get("/", (req, res) => {
  res.render("index", { title: "Home", year: moment().format("YYYY") });
});

app.get("/auftragsdepot24-agb", (req, res) => {
  res.render("subpages/agb", {
    title: "AGB",
    today: moment().format("DD.MM.YYYY"),
    year: moment().format("YYYY")
  });
});

app.get("/auftragsdepot24-impressum", (req, res) => {
  res.render("subpages/impressum", {
    title: "Impressum",
    today: moment().format("DD.MM.YYYY"),
    year: moment().format("YYYY")
  });
});

app.get("/auftragsdepot24-datenschutz", (req, res) => {
  res.render("subpages/datenschutz", {
    title: "Datenschutzerklärung",
    today: moment().format("DD.MM.YYYY"),
    year: moment().format("YYYY")
  });
});

app.get("/handwerker-finden", (req, res) => {
  res.render("person", {
    title: "Handwerker finden",
    categories: categories,
    year: moment().format("YYYY"),
    today: moment().format("YYYY-MM-DD"),
    inOneWeek: moment()
      .day(7)
      .format("YYYY-MM-DD")
  });
});

app.get("/auftraege-finden", (req, res) => {
  res.render("company", {
    title: "Aufträge finden",
    year: moment().format("YYYY")
  });
});

app.post("/person-registrieren", (req, res) => {
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
            name: fields.email || "",
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
            custom_fields_type_id: 31437,
            name: fields.mainCat || ""
          },
          {
            custom_fields_type_id: 31440,
            name: fields.secCat || ""
          },
          {
            custom_fields_type_id: 31443,
            name: fields.budget || "Nicht angegeben"
          },
          {
            custom_fields_type_id: 31446,
            name: fields.dateFrom + " - " + fields.dateTo || ""
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
        if (response.Person) {
          res
            .status(200)
            .send({ Person: response.Person, Protocol: response.Protocol });
        } else {
          res.status(404).send(response.message);
        }
      })
      .catch((e) => {
        res.status(500).send("Fehler beim erstellen Deiner Anfrage.");
      });
  });
});

// Register a Company
app.post("/handwerker-registrieren", (req, res) => {
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
            custom_fields_type_id: 31863,
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
        if (response.Company) {
          res
            .status(200)
            .send(
              { Company: response.Company, Protocol: response.Protocol } ||
                response
            );
        } else {
          res.status(404).send(response.message);
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
  let topic = "Newsletter";

  if (type === "Rückrufanforderung" && !validator.isMobilePhone(email))
    return res.status(500).send("Bitte eine gültige Telefonnummer eingeben");

  if (!validator.isEmail(email) && !validator.isMobilePhone(email))
    return res.status(500).send("Keine gültigen Daten");

  if (!validator.isEmail(email)) {
    topic = "Nachricht Webseite";
  }
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
    from: `"${topic}" <${mail.absender}> - ${type}`, // sender address
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
