var db = require("../db/db");
var uniqueString = require('unique-string');
var fs = require("fs");
var util = require ('util');

var writeFileAsync = util.promisify(fs.writeFile);

module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        res.json(db);
    });

    app.post("/api/notes", async function(req, res) {
        req.body.id = uniqueString();
        db.push(req.body);

        try {
            await writeFileAsync('./db/db.json', JSON.stringify(db));
            console.log("updated database");
            return res.json(true);
        }
        catch(err) {
            console.log(err)
            return res.json(false);
        }
    });

    app.delete("/api/notes/:id", async function(req, res) {
        console.log(req.url);

        var index = db.findIndex(function(note){
            return note.id === req.params.id;
        })
        if (index !== -1) db.splice(index, 1);
        console.log('db:', db)

        try {
            await writeFileAsync('./db/db.json', JSON.stringify(db));
            console.log("updated database");
            return res.json(true);
        }
        catch(err) {
            console.log(err)
            return res.json(false);
        }
    });
}

