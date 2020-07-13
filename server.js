// Dependencies
// ===========================================================
var express = require("express");
var app = express();
var PORT = process.env.PORT || 8000;
const path = require("path");
const fs = require("fs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

function read() {
    return fs.readFileSync('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        return data;
    });
}

function write(data) {
    fs.writeFileSync('db/db.json', JSON.stringify(data), (err) => {
        if (err) throw err;
    });
}

// Routes
// ===========================================================
// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    const notes = JSON.parse(read());
    return res.json(notes);
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.post("/api/notes", function (req, res) {
    const newNote = req.body;
    const notes = JSON.parse(read());
    newNote.id = notes.length;
    notes.push(newNote);
    write(notes);
    return res.json(newNote);
});

app.delete("/api/notes/:id", function (req, res) {
    // console.log("DELETING A NOTE!");
    const id = parseInt(req.params.id);
    let notes = JSON.parse(read());
    notes = notes.filter(note => note.id != id);
    write(notes);
    return res.json(notes);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
})