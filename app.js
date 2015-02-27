// Dependencies
var express = require('express');
var stylus = require('stylus');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var CronJob = require('cron').CronJob;

var parseBNR = require('./models/parseBNR');

var app = express();

// Mongoo connection
mongoose.connect('mongodb://localhost/rateInfo');

// Express
function compile(str, path){
  return stylus(str).set('filename', path);
};

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(stylus.middleware(
	{	src: __dirname + '/public'
	, compile : compile
	}
));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.render('index', {title: 'Currency'});
});

// Routes
app.use('/api', require('./routes/api'));

// Start server
app.listen(3000);
console.log("Let's rumble!");

// Fire up the cronjob
new CronJob('00 00 * * 1-5', function(){
  parseBNR.populateDB();
  console.log('BNR data parsed succesfully!');
}, null, true);
