const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();

var items = ["Buy Food", "Cook Food", "Eat Food"];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("list", { day: date.getDate(), newTaskItems: items });
});

app.post("/", function (req, res) {
    items.push(req.body.newTask);
    res.redirect("/");
})

app.listen(3000, function () {
    console.log("Server started on port 3000");
})