//AUTHOR: MARK RENZI
// init project
require("dotenv").config();
const express = require("express");
const app = express();
const compression = require("compression");
const favicon = require("serve-favicon");
const path = require("path");

app.use(express.static("public"));
app.use(express.json());

app.use(compression());
app.use(favicon(path.join(__dirname, "assets", "favicon-32.ico")));

//ROUTES
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/main.html");
});

app.get("/manifest.json", (req, res) => {
  res.sendFile(__dirname + "/manifest.json");
});

app.get("/assets/favicon-32.ico", (req, res) => {
  res.sendFile(__dirname + "/assets/favicon-32.ico");
});

app.get("/assets/2.jpg", (req, res) => {
  res.sendFile(__dirname + "/assets/2.jpg");
});

app.get("/assets/NinjaSe.png", (req, res) => {
  res.sendFile(__dirname + "/assets/NinjaSe.png");
});

app.get("/public/scripts.js", (req, res) => {
  res.sendFile(__dirname + "/public/scripts.js");
});

app.get("/lib/index.js", (req, res) => {
  res.sendFile(__dirname + "/lib/index.js");
});

app.get("/lib/App.js", (req, res) => {
  res.sendFile(__dirname + "/lib/App.js");
});

app.get("/Layout.js", (req, res) => {
  res.sendFile(__dirname + "/Layout.js");
});

app.get("/model/Model.js", (req, res) => {
  res.sendFile(__dirname + "/model/Model.js");
});

app.get("/model/Puzzle.js", (req, res) => {
  res.sendFile(__dirname + "/model/Puzzle.js");
});

app.get("/boundary/Boundary.js", (req, res) => {
  res.sendFile(__dirname + "/boundary/Boundary.js");
});

app.get("/controller/Controller.js", (req, res) => {
  res.sendFile(__dirname + "/controller/Controller.js");
});

//LISTEN
app.listen(8000, () => {
  console.log("Server is up and running at the port 8000");
});
