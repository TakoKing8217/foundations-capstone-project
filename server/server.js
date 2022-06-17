require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

const controllerList = require(`./controller.js`);

const { lastDate, dateList, upcomingDates, deleteValue, getList } =
  controllerList;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/main.html"));
});
app.get("/what-season-now", lastDate);
app.post("/get-date", dateList);
app.get("/upcoming", upcomingDates);
app.delete("/list/:id", deleteValue);
app.get("/list", getList);

const port = process.env.PORT || 5005;
app.listen(port, () => console.log(`Listening on ${port}`));
