function compare(){
	var Config = {
		path:"",
		file:{
			name:"全区汇总2017",
			idNumCol:'C',
			relationCol:'H'
		},
		resultFile:{
			name : "无户主家庭2017",
			sheetName : "sheet",
		}
	};

	var Excel = require("exceljs");
	var file = new Excel.Workbook(),
		resultFile = new Excel.Workbook(),
		resultSheet = resultFile.addWorksheet(Config.resultFile.sheetName);

	function onLoad(){
		console.log("load success");

		var sheet = file.getWorksheet(1);

		console.log('任务数量：' + sheet.rowCount);
		var completePercent = 0;

		var houseCode = '',
		familyCount = 0;
		sheet.eachRow(function(row,rowNumber){
			var nowHouseCode = row.getCell(Config.file.idNumCol).value;
			if(nowHouseCode!=houseCode){
				houseCode = nowHouseCode;
				familyCount++;
				var relation = row.getCell(Config.file.relationCol).value;
				if((relation!='户主')&&(relation!='01')){
					resultSheet.addRow(row.values);
				}
				var nowPercent = ((rowNumber/sheet.rowCount*100) | 0);
				if(nowPercent > completePercent){
					completePercent = nowPercent;
					console.log('完成率:' + completePercent + '%');
				}
			}
		});
		resultFile.xlsx.writeFile(Config.resultFile.name + ".xlsx").then(function(){
			console.log('完成：'+ familyCount +'户');
		});
	}


	file.xlsx.readFile(Config.path + Config.file.name + ".xlsx").then(onLoad);

};
compare();