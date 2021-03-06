const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const path = require("path");
const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://ericcwong-budget-tracker:gameboy12@ds335678.mlab.com:35678/heroku_s55ktd28",
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    },
    () => console.log("Connected to DB")
);

// routes
app.use(require("./routing/api-routing.js"));
app.get("/", (req, res) =>{
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.listen(process.env.PORT || PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
