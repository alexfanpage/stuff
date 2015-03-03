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
app.get('/currency/eur', function(req, res){
  bnrModel.findAllEur(res);
});

app.get('/currency/eur/today', function(req, res){
  bnrModel.findEurByTodayDate(res);
});

// Usd
app.get('/currency/usd', function(req, res){
  bnrModel.findAllUsd(res);
});

app.get('/currency/usd/today', function(req, res){
  bnrModel.findUsdByTodayDate(res);
});

// Return app
module.exports = app;
