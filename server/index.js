const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ScoreModel = require("./models/Scores");
require('dotenv').config()

const cors = require('cors')

app.use(express.json());
app.use(cors())

mongoose.connect(
  `${process.env.MONGODB_URI}`
);

app.get("/getScores", (req, res) => {
  ScoreModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  }).sort({score:-1});
});

app.post("/postScore", async (req, res) => {
  const score = req.body
  const newScore = new ScoreModel(score);
  await newScore.save();

  res.json(score)
})

app.listen(process.env.PORT || 3001, () => {
  console.log("SERVER IS RUNNING!");
});
