var parse = require('xml-parser');
var HTTPRequest = require('HTTPRequest');
var model = require('../models/bnrModel.js');

var populateDB = function() {
	HTTPRequest.get('http://www.bnr.ro/nbrfxrates.xml', function (status, headers, xml) {
		var data = parse(xml);
		var parsedData = JSON.stringify(data);

		var euro = data.root.children[1].children[2].children[10].attributes.currency;
		var valueEuro = data.root.children[1].children[2].children[10].content;

		var usd = data.root.children[1].children[2].children[26].attributes.currency;
		var valueUsd = data.root.children[1].children[2].children[26].content;

		var gbp = data.root.children[1].children[2].children[11].attributes.currency;
		var valueGbp = data.root.children[1].children[2].children[11].content;

		var date = Date();

    var saveEuro = new model.bnrModel({
      "name" : euro,
      "value" : valueEuro,
      "date" : date
    });
    var saveUsd = new model.bnrModel({
      "name" : usd,
      "value" : valueUsd,
      "date" : date
    });
    var saveGbp = new model.bnrModel({
      "name" : gbp,
      "value" : valueGbp,
      "date" : date
    });

    saveEuro.save(saveEuro, {safe:true}, function(err, result) {});
    saveUsd.save(saveUsd, {safe:true}, function(err, result) {});
    saveGbp.save(saveGbp, {safe:true}, function(err, result) {});
  });
};

module.exports = {
  populateDB: populateDB
}
