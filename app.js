// Dependencies
var express = require('express');
var stylus = require('stylus');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var CronJob = require('cron').CronJob;
var sessions = require('client-sessions');

var parseBNR = require('./models/parseBNR');
var user = require('./models/userModel');

var app = express();

// Mongoo connection
mongoose.connect('mongodb://localhost/rateInfo');

// Express
function compile(str, path){
  return stylus(str).set('filename', path);
};

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.locals.pretty = true;
app.use(express.logger('dev'));
app.use(stylus.middleware(
	{	src: __dirname + '/public'
	, compile : compile
	}
));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(sessions({
  cookieName: 'session',
  secret: 'd6as54d76!@#SAD#@!!@cdsa',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}));


//register
app.get('/register', function (req, res){
  res.render('register', {title: 'Register Page'});
});
app.post('/register', function (req, res){
  var users = new user.userModel({
    email: req.body.email,
    password: req.body.password
  });
  users.save(function (err){
    if (err){
      var err = "Try again !";
    if (err.code === 11000){
      err = 'This email si already taken, try another one !';      
    } 
      res.render('register', {
        title: 'Register Page',
        error: err
      });
    } else {
      res.redirect('/login');
    }
  });
});

//login
app.get('/login', function (req, res){
  res.render('login', {title: 'Login Page'});
});
app.post('/login', function (req, res){
  user.userModel.findOne({email: req.body.email}, function(err, user){
    if(!user){
      res.render('login', {
        title: 'Login Page',
        error: "Invalid email or password"
    });
    } else {
      if (req.body.password === user.password){
        req.session.user = user;
        res.redirect('/');
      } else {
        res.render('login', {
          title: 'Login Page',
          error: "Invalid email or password !"
        });
      }
    }
  });
});

app.get('/', function (req, res){
  if(req.session && req.session.user){
    user.userModel.findOne({email: req.session.user.email}, function (err, user){
      if(!user){
        req.session.reset();
        res.redirect('/login');
      } else {
        res.locals.user = user;
        res.render('index', {title: 'Currency'});
      }
    });
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', function (req, res){
  req.session.reset();
  res.redirect('/');
});

app.get('/user', function (req, res) {
 if(req.session && req.session.user){
    user.userModel.findOne({email: req.session.user.email}, function (err, data){
      res.json(data);
    });
  }
});


// Routes
app.use('/api', require('./routes/api'));

// Start server
app.listen(3000);
console.log("Let's rumble!");
//console.log(user);

// Fire up the cronjob
new CronJob('00 00 * * 1-5', function(){
  parseBNR.populateDB();
  console.log('BNR data parsed succesfully!');
}, null, true);
