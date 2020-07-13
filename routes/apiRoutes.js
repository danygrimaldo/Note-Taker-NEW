// const router = require("express").Router();
const fs = require("fs");

function read() {
    return fs.readFile('db/db.json', (err, data) => {
        if (err) throw err;
        return data;
    });
}

function write() {
    fs.writeFile('db/db.json', (err, data) => {
        if (err) throw err;
        return JSON.stringify(data);
    });
}

module.exports = function (app) {
    // app.get("api/notes", function (req, res) {
    //     const notes = JSON.parse(read());
    //     return res.json(notes);
    // });

    // app.post("api/notes", function (req, res) {
    //     let newNote = req.body;
    //     read();
    //     notes.push(newNote);
    //     write();
    //     console.log("Your note has been added!");
    //     return (notes);
    // });

    // Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved.
    // app.delete("api/notes/:id", function (req, res) {

    // In order to delete a note, you'll need to read all notes from the `db.json` file,
    // read();

    // remove the note with the given `id` property,

    // and then rewrite the notes to the `db.json` file.
    // write();
    // return (notes);
    // });
};