var MongoClient = require('mongodb').MongoClient;
var DB_URL = 'mongodb://127.0.0.1:27017/',
	DB_NAME = 2017;

var connectDB = function(optionFun){
	MongoClient.connect(DB_URL+DB_NAME,function(err,db){
		if(err){
			console.log('链接到数据库失败!');
			console.log(err);
			return;
		}
		optionFun(db);
		db.close();
	});
};

var transJson =  function(dcArr){
	var resultArr = [];
	dcArr.forEach(function(family,item){
		var helperArr = family.body.dataStores.result.rowSet.primary;
		var helperInfo = [];
		helperArr.forEach(function(helper){
			var helperInfo = {};
			helper = helper.data;
			helperInfo.peopleCode = helper.AAK110;
			helperInfo.name = helper.AAB002;
			helperInfo.org = helper.AAP001;
			helperInfo.familyCode = helper.AAC001;
			helperInfo.townName = helper.AAR025;
			resultArr.push(helperInfo);
		});
	});

	connectDB(function(db){
		var tabHelper = db.collection('helper');
		tabHelper.insertMany(resultArr,function(err,optResult){
			if(err){console.log(err);}
		});
	});
};

exports.setPoorsHelper = function(dcArr){
	transJson(dcArr);
}