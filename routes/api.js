// Dependencies
var express  = require('express');
var app = express();

// Models
var rateInfo = require('../models/parseBNR.js');
var bnrModel = require('../models/bnrModel.js');

app.get('/currencies/today', function(req, res){
  bnrModel.findByTodayDate(res);
});

app.get('/currencies', function(req, res) {
  bnrModel.findAll(res);
});

// Return app
module.exports = app;
