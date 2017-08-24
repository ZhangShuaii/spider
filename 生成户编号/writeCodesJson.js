var Excel = require('exceljs');
var excelBook = new Excel.Workbook(),
YEAR = 2017;

excelBook.xlsx.readFile('全区汇总'+YEAR+'.xlsx').then(function(){
	var sheet = excelBook.getWorksheet(1);
	var houseCodes = [];

	console.log('任务数量：' + sheet.rowCount);
	var completePercent = 0;

	var houseCode = '',
	familyCount = 0;

	sheet.eachRow(function(row,rowNumber){
		var nowHouseCode = row.getCell('C').value;	//户编号所在列
		if(nowHouseCode!=houseCode){
			houseCode = nowHouseCode;
			familyCount++;
			houseCodes.push(nowHouseCode);

			var nowPercent = ((rowNumber/sheet.rowCount*100) | 0);
			if(nowPercent > completePercent){
				completePercent = nowPercent;
				console.log('完成率:' + completePercent + '%');
			}
		}
	});


	var fs = require('fs');
	var jsonData = "var houseCodes =  '" + JSON.stringify(houseCodes) +"';";
	fs.writeFile('houseCodesJson'+YEAR+'.js',jsonData,function(err){
		if(err){
			console.log(err);
		}else{
			console.log('共计'+(familyCount-1)+'户');
		}
	});
});
