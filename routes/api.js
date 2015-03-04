// Dependencies
var express  = require('express');
var app = express();

// Models
var rateInfo = require('../models/parseBNR.js');
var bnrModel = require('../models/bnrModel.js');

//all currencies
app.get('/currencies', function(req, res) {
  bnrModel.findAll(res);
});

app.get('/currencies/today', function(req, res){
  bnrModel.findByTodayDate(res);
});

// Euro
app.get('/currency/:currency', function(req, res){
  bnrModel.findAllByCurrency(res, req.params.currency);
});

app.get('/currency/eur/today', function(req, res){
  bnrModel.findEurByTodayDate(res);
});

app.get('/currency/eur/last-five', function(req, res){
  bnrModel.findEurByLastFiveDays(res);
});

// Return app
module.exports = app;
