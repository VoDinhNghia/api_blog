const express = require("express");
const app = express();
require('./config/global');
app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
const initAPIs = require("./router/Api");

app.use(express.json());

initAPIs(app);

let port = 8887;
app.listen(port, () => {
    console.log(`Hello, I'm running at localhost:${port}/`);
});