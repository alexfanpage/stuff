// Dependencies
var express  = require('express'),
    app = express();
// Models
var rateInfo = require('../models/parseBNR.js');
var certainRateInfo = require('../models/post.js');

// Routes
app.get('/currency', function(req, res) {
  rateInfo.parseRate(res);
});

app.get('/post', function(req, res){
  certainRateInfo.findByDate(res);
});

// Return app
module.exports = app;



