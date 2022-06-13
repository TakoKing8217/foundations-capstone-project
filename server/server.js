const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.get("/easter", (req, res) => {
  return "Yes it is";
});

app.listen(4000, console.log("Server running on 4000"));
