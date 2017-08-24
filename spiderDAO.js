var MongoClient = require('mongodb').MongoClient;
var DB_URL = 'mongodb://127.0.0.1:27017/';

var connectDB = function(years,optionFun){
	MongoClient.connect(DB_URL+years,function(err,db){
		if(err){
			console.log('链接到数据库失败!');
			console.log(err);
			return;
		}
		optionFun(db);
		db.close();
	});
};

exports.add = function(years,dataArr){
	connectDB(years,function(db){
		var collection_POOR_FAMILY = db.collection('POOR_FAMILY');
		dataArr.forEach(function(val,key){
			collection_POOR_FAMILY.insert(val,function(err,result){
				if(err){
					return;
				}
			});
		});
	});
};