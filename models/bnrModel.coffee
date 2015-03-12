mongoose = require('mongoose')
Schema = mongoose.Schema

bnrSchema = new Schema({
  name  : { type : String, required: true, trim: true },
  value : { type : Number, required: true, trim: true },
  date  : { type : Date, required : true, trim:true, default: Date() }
})

bnrModel = mongoose.model('rateInfo', bnrSchema)

findByTodayDate = (res) ->
  d = new Date()
  d.setHours(0,0,0,0)

  bnrModel.find({"date": {
    $gte: new Date(d.toISOString())
    }}, (error, data) ->
    res.end(JSON.stringify(data))
  )

findAll = (res) ->
  bnrModel.find({}).sort({date: 'desc'}).exec((err, data) ->
    res.end(JSON.stringify(data))
  )


findAllCurrenciesByLastFiveDays = (res, currency) ->
  d = new Date()
  d.setHours(0,0,0,0)
  d.setDate(d.getDate()-4)

  bnrModel.find({name: currency.toUpperCase(), "date": {
    $gte: new Date(d.toISOString())
    }}, (err, data) ->
    res.end(JSON.stringify(data))
  )

findAllByLastFiveDays = (res, currency) ->
  d = new Date()
  d.setHours(0,0,0,0)
  d.setDate(d.getDate()-5)

  bnrModel.find({"date": {
    $gte: new Date(d.toISOString())
    }}).sort({date: 'asc'}).exec((err, data) ->
    res.end(JSON.stringify(data))
  )


findCurrencyByTodayDate = (res, currency) ->
  d = new Date()
  d.setHours(0,0,0,0)

  bnrModel.find({name: currency.toUpperCase(), "date": {
    $gte: new Date(d.toISOString())
    }}, (err, data) ->
    res.end(JSON.stringify(data))
  )

findAllByCurrency = (res, currency) ->
  bnrModel.find({name: currency.toUpperCase()}, (err, data) ->
    res.end(JSON.stringify(data))
  )


module.exports = {
  findCurrencyByTodayDate: findCurrencyByTodayDate,
  findAllCurrenciesByLastFiveDays: findAllCurrenciesByLastFiveDays,
  findAllByLastFiveDays: findAllByLastFiveDays,
  findAllByCurrency: findAllByCurrency,
  findAll: findAll,
  findByTodayDate : findByTodayDate,
  bnrModel : bnrModel
}
