var db = require("../db/db");

//import unique-string module for creating a unique id for each note
var uniqueString = require('unique-string');

//fs module
var fs = require("fs");
var util = require ('util');

var writeFileAsync = util.promisify(fs.writeFile);

//api routes
module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        res.json(db);
    });

    app.post("/api/notes", async function(req, res) {
        //create unique id for each note
        req.body.id = uniqueString();
        //retrieve notes
        db.push(req.body);
        //store the notes
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
        //using the id of the note
        var index = db.findIndex(function(note){
            return note.id === req.params.id;
        })
        //delete note
        if (index !== -1) db.splice(index, 1);
        console.log('db:', db)
        //update the database
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

