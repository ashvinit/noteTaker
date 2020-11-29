//Path package to get to the correct file path for our html
var path = require("path");

module.exports = function(app) {

    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    app.get("*", function(req, res) {
        res.sednFile(path.join(__dirname, "../public/index.html"))
    });
};