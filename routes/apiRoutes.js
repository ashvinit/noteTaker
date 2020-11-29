var db = require("../db/db");
var uniqueString = require('unique-string');
var fs = require("fs");

 

module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        res.json(db);
    });

    app.post("/api/notes", function(req, res) {
        req.body.id = uniqueString();
        db.push(req.body);
        return res.json(true);
    });
}