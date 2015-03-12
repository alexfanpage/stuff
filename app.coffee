# Dependencies
express = require('express')
stylus = require('stylus')
bodyParser = require('body-parser')
mongoose = require('mongoose')
CronJob = require('cron').CronJob
sessions = require('client-sessions')
require('gulpfile_coffee.coffee');

parseBNR = require('./models/parseBNR')
user = require('./models/userModel')

app = express()

## Mongoo connection
mongoose.connect('mongodb://localhost/rateInfo')


# Express
compile = (str, path) ->
  stylus(str).set('filename', path)

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.locals.pretty = true
app.use(express.logger('dev'))
app.use(stylus.middleware(
	{	src: __dirname + '/public'
	, compile : compile
	}
))
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(sessions({
  cookieName: 'session',
  secret: 'd6as54d76!@#SAD#@!!@cdsa',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}))

# Register
app.get('/register', (req, res) ->
  res.render('register', {title: 'Register Page'}))

app.post('register', (req, res) ->
  (users = new user.userModel {
    email : req.body.email
    password : req.body.password
  }
  users.save (err) -> if (err)
    err = 'Try Again'
    res.render('register', { title: 'Register Page', error: err})
  else
    res.redirect('/login')
  )
)

# Login
app.get('/login', (req, res) ->
  res.render('login', {title: 'Login Page'}))

app.post('/login', (req, res) ->
  user.userModel.findOne({email: req.body.email}, (err, user) ->
    if !user
      res.render('login', {title: 'Login Page', error: 'Invalid email or password'})
    else
      if req.body.password == user.password
        req.session.user = user
        res.redirect('/')
      else
        res.render('login', {title:'Login page', error: 'Invalid email or password!'})
  )
)

app.get('/', (req, res) ->
  if req.session && req.session.user
    user.userModel.findOne({email: req.session.user.email}, (err, user) ->
      if !user
        req.session.reset()
        res.redirect('/login')
      else
        res.locals.user = user;
        res.render('index', {title: 'Currency'})
   )
   else
    res.redirect('/login')
)

app.get('/logout', (req, res) ->
  req.session.reset()
  res.redirect('/')
)

app.get('/user', (req, res) ->
  if req.session && req.session.user
    user.userModel.findOne({email: req.session.user.email}, (err, data) ->
      res.json(data)
    )
)

# Routes

app.use('/api', require('./routes/api'))

# Start Server

app.listen(3000)
console.log("Let's rumble!")

#Fire up the cronjob

new CronJob('00 00 * * 1-5', ->
  parseBNR.populateDB()
  console.log('BNR data parsed successfully!')
null, true)


