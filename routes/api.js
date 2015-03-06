// Dependencies
var express  = require('express');
var app = express();
var user = require('../models/userModel');

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
  if(req.session && req.session.user){
    user.userModel.findOne({email: req.session.user.email}, function (err, user){
      if(!user){
        req.session.reset();
        res.redirect('/login');
      } else {
        res.locals.user = user;
        res.render('/currency/:currency');
      }
    });
  } else {
    res.redirect('/login');
  }
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
