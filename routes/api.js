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

app.get('/currencies/last-five', function(req, res){
  bnrModel.findAllByLastFiveDays(res);
});

app.get('/currency/:currency', function(req, res){
  var currency = req.params.currency;
  bnrModel.findAllByCurrency(res, currency);
});

app.get('/currency/:currency/last-five', function(req, res){
  var currency = req.params.currency;
  bnrModel.findAllCurrenciesByLastFiveDays(res, currency);
});

app.get('/currency/:currency/today', function(req, res){
  var currency = req.params.currency;
  bnrModel.findCurrencyByTodayDate(res, currency);
});

// Return app
module.exports = app;
