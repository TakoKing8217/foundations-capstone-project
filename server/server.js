const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

const controllerList = require(`./controller.js`);

const { lastDate, dateList, upcomingDates } = controllerList;

app.get("/what-season-now", lastDate);
app.get("/add-date", dateList);
app.get("/upcoming", upcomingDates);

app.listen(5501, () => console.log("Server running on 5501"));
