const express = require('express');
var port = 8080;

const app = express();

app.use(express.static('public/'));

const server = app.listen(port, function () {
    console.log("Running on Among us live on port " + port);
});