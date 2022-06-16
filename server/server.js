require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const { SERVER_PORT, CONNECTION_STRING } = process.env;

app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use(express.static("public"));

const controllerList = require(`./controller.js`);

const { lastDate, dateList, upcomingDates, deleteValue } = controllerList;

app.get("/what-season-now", lastDate);
app.post("/get-date", dateList);
app.get("/upcoming", upcomingDates);
app.delete("/list/:id", deleteValue);

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`));
