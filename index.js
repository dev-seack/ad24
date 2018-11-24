// packages
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const nodemailer = require("nodemailer");
const excel = require("excel4node");
const nib = require("nib");
const stylus = require("stylus");

// port
const PORT = 3000;

const app = express();

// set view engine
app.set("views", __dirname + "/views");
app.set("view engine", "pug");

// bodyparser
app.use(bodyParser.json());

// stylus
app.use(
  stylus.middleware({
    src: __dirname + "/public",
    compile: (str, path) =>
      stylus(str)
        .set("filename", path)
        .use(nib())
  })
);

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// listen
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
