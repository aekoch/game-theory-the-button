
var path = require('path');
var express = require('express');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());