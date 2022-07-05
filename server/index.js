const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ScoreModel = require("./models/Scores");
require('dotenv').config()

const cors = require('cors')

app.use(express.json());
app.use(cors())

mongoose.connect(
  `mongodb+srv://${process.env.SECRET_USER}:${process.env.SECRET_KEY}@triviacluster.eyyonie.mongodb.net/trivia-app?retryWrites=true&w=majority`
);

app.get("/getScores", (req, res) => {
  ScoreModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/postScore", async (req, res) => {
  const score = req.body
  const newScore = new ScoreModel(score);
  await newScore.save();

  res.json(score)
})

app.listen(3001, () => {
  console.log("SERVER IS RUNNING!");
});
