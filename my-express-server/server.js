const express = require("express");
const app = express();

app.get("/", function (request, response) {
    response.send("Hello");
})

app.get("/test", function (req, res) {
    res.send("Hey");
})

app.listen(3000, function () {
    console.log("Server started on port 3000");
});