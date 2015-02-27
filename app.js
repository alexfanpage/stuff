// Dependencies
var express = require('express'),
    stylus = require('stylus'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express();

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
  res.render('index',
  	{ 
      title: 'Currency'
  	}
  );
});

// Routes
app.use('/api', require('./routes/api'));

// Start server
app.listen(3000);
console.log("Let's rumble!");








