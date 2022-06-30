const express = require("express");
const app = express();
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://mckinnondave:Vaughnhockey2@triviacluster.eyyonie.mongodb.net/trivia-app?retryWrites=true&w=majority")

app.listen(3001, () => {
  console.log("SERVER IS RUNNING!");
})