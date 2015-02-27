var parse = require('xml-parser'),
		HTTPRequest = require('HTTPRequest'),
		model = require('../models/post.js'),
		CronJob = require('cron').CronJob;

// parse
var parseRate = function(res){
	HTTPRequest.get('http://www.bnr.ro/nbrfxrates.xml', function (status, headers, xml) {
		var data = parse(xml);
		var parsedData = JSON.stringify(data);
		res.end(parsedData);

		var euro = data.root.children[1].children[2].children[10].attributes.currency,
				valueEuro = data.root.children[1].children[2].children[10].content,
				usd = data.root.children[1].children[2].children[26].attributes.currency,
				valueUsd = data.root.children[1].children[2].children[26].content,
				gbp = data.root.children[1].children[2].children[11].attributes.currency,
				valueGbp = data.root.children[1].children[2].children[11].content,
				date = Date();

		console.log(euro + ' = ' + valueEuro);
		console.log(usd + ' = ' + valueUsd);
		console.log(gbp + ' = ' + valueGbp);
		console.log(date);

		var populateDB = function() {
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
		};

		new CronJob('00 10 12 * * 1-5', function(){
			populateDB();
    	console.log('Succes !');
		}, null, true);
	});
};


module.exports = {
		parseRate : parseRate
}
