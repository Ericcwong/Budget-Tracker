const path = require("path");

module.exports = function(app){
    app.get("/exercise", (req, res) =>{
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    });
}