parse = require('xml-parser')
HTTPRequest = require('HTTPRequest')
model = require('../models/bnrModel.js')

populateDB = ->
  HTTPRequest.get('http://www.bnr.ro/nbrfxrates.xml', (status, headers, xml) ->
    data = parse(xml)
    parsedData = JSON.stringify(data)

    euro = data.root.children[1].children[2].children[10].attributes.currency
    valueEuro = data.root.children[1].children[2].children[10].content

    usd = data.root.children[1].children[2].children[26].attributes.currency
    valueUsd = data.root.children[1].children[2].children[26].content

    gbp = data.root.children[1].children[2].children[11].attributes.currency
    valueGbp = data.root.children[1].children[2].children[11].content

    date = Date()

    saveEuro = new model.bnrModel({
      "name" : euro,
      "value" : valueEuro,
      "date" : date
    })

    saveUsd = new model.bnrModel({
      "name" : usd,
      "value" : valueUsd,
      "date" : date
    })

    saveGbp = new model.bnrModel({
      "name" : gbp,
      "value" : valueGbp,
      "date" : date
    })

    saveEuro.save(saveEuro, {safe:true}, (err, result) -> )
    saveUsd.save(saveUsd, {safe:true}, (err, result) -> )
    saveGbp.save(saveGbp, {safe:true}, (err, result) -> )
  )


module.exports = {
  populateDB: populateDB
}
