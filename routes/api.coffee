# Dependencies
express  = require('express')
app = express()
user = require('../models/userModel')

# Models
rateInfo = require('../models/parseBNR.js')
bnrModel = require('../models/bnrModel.js')

# all currencies
app.get('/currencies', (req, res) ->
  bnrModel.findAll(res)
)

app.get('/currencies/today', (req, res) ->
  bnrModel.findByTodayDate(res)
)

app.get('/currencies/last-five', (req, res) ->
  bnrModel.findAllByLastFiveDays(res)
)

app.get('/currency/:currency', (req, res) ->
  if req.session && req.session.user
    user.userModel.findOne({email: req.session.user.email}, (err, user) ->
      if !user
        req.session.reset()
        res.redirect('/login')
      else
        res.locals.user = user
        res.render('/currency/:currency')
  )
  else
    res.redirect('/login')

  currency = req.params.currency
  bnrModel.findAllByCurrency(res, currency)
)

app.get('/currency/:currency/last-five', (req, res) ->
  currency = req.params.currency
  bnrModel.findAllCurrenciesByLastFiveDays(res, currency)
)

app.get('/currency/:currency/today', (req, res) ->
  currency = req.params.currency
  bnrModel.findCurrencyByTodayDate(res, currency)
)

# Return app
module.exports = app
