const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

const controllerList = require(`./controller.js`);

const { isItEaster } = controllerList;

app.get("/asdf", isItEaster);

app.listen(5500, () => console.log("Server running on 5500"));
