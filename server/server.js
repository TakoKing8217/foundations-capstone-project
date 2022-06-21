require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/main.html"));
});

const controllerList = require(`./controller.js`);

const {
  lastDate,
  dateList,
  upcomingDates,
  deleteValue,
  getList,
  getDegrees,
  getThisYear,
  whatIsEaster,
} = controllerList;

app.get("/what-season-now", lastDate);
app.post("/get-date", dateList);
app.get("/upcoming", upcomingDates);
app.delete("/list/:id", deleteValue);
app.get("/list", getList);
app.get("/calendar-pieces", getDegrees);
app.get("/what-church-year", getThisYear);
app.get("/get-easter", whatIsEaster);

const port = process.env.PORT || 5005;
app.listen(port, () => console.log(`Listening on ${port}`));
