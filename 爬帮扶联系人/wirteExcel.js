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

var dirtyDataArr = [];
var dirtyDataHandle = function(helper){
	connectDB(function(db){
		var tabHelper = db.collection('helper');
		tabHelper.find({peopleCode:helper.peopleCode}).toArray(function(err,result){
			[].push.apply(dirtyDataArr,result);
		});
	})
};

connectDB(function(db){
	var tabHelper = db.collection('helper');
	tabHelper.aggregate([
		{
			$group : {
				_id : "$peopleCode",
				count : {$sum : 1},
				// familyCode:{$push:'$familyCode'},
				peopleCode:{$first:'$peopleCode'},
				name:{$first:'$name'},
				org:{$first:'$org'},
				townName:{$first:'$townName'},
			},
		},
		{
			$match : { count : { $gt : 10} } 
		},{
			$sort :{townName:1}
		}],function(err,result){
			// console.log(result);
			var Excel = require('exceljs');
			//统计表
			var workBook = new Excel.Workbook();
			var workSheet = workBook.addWorksheet("sheet");
			workSheet.addRow(['序号','乡镇','帮扶联系人姓名','帮扶联系人单位','帮扶户数']);
			result.forEach(function(helper,item){
				workSheet.addRow([item+1,helper.townName,helper.name,helper.org,helper.count]);
				if(!helper.townName){
					dirtyDataHandle(helper);
				}
			});

			workBook.xlsx.writeFile('帮扶联系人统计.xlsx').then(function(){
				//脏数据统计表
				var workBook2 = new Excel.Workbook();
				var workSheet2 = workBook2.addWorksheet("sheet");
				workSheet2.addRow(['序号','乡镇','帮扶联系人姓名','帮扶联系人单位','帮扶的户编号']);
				dirtyDataArr.forEach(function(helper,item){
					if(helper.townName!=null){
						return;
					}
					// console.log([item+1,helper.townName,helper.name,helper.org,helper.familyCode]);
					workSheet2.addRow([item+1,helper.townName,helper.name,helper.org,helper.familyCode]);
				});
				workBook2.xlsx.writeFile('无效的帮扶联系人.xlsx').then(function(){
					console.log('success');
				});
			});
		}
	);
});