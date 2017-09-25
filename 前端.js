/*查询单户贫困户信息*/
window.HttpService = HttpService;

        HttpService.setParameter( "AAR008", "341503018005" );  //地区编号	
		HttpService.setParameter( "aac001", 3111346422 );		//户编号
		HttpService.setParameter("AAR040", 2016);
		HttpService.setBusinessId("BIZ_PrFamilyMgr_GetProAndLivInfo");

		var onSuccess = function (dataCenter) {
			window.DC = dataCenter;
			console.log(DC);
		};

		var onFault = function (err) {
			console.log(err);
		};

		HttpService.doQuery(onSuccess,onFault);

/*查询乡编号*/
var onSuccess = function(dc){window.dc = dc;console.log(dc);}
var onFault = function (err) {console.log(err);};
HttpService.setParameter("province",340000000000);
HttpService.setParameter("city",341500000000);
HttpService.setParameter("county",341503000000);
HttpService.setParameter("town",341503018000);
HttpService.setParameter("subDistrict",341503018000);
HttpService.setBusinessId("BIZ_common_queryAllDistrict");
HttpService.doQuery(onSuccess,onFault);

/*查询村编号*/
var townMap = {},successItem = 0;
var onSuccess = function(dc){
	successItem++;
	var townArr = dc.body.dataStores.result7.rowSet.primary;
	townArr.forEach(function(val2,key2){
		townMap[val2.data.AAR001] = val2.data.AAR009;
	});
	console.log("录入村：" + townArr.length);
	console.log("录入乡：" + successItem);
	console.log('------');
};

var onFault = function (err) {console.log(err);};

for(var key in countryMap){
	HttpService.setParameter("province",340000000000);
	HttpService.setParameter("city",341500000000);
	HttpService.setParameter("county",341503000000);
	HttpService.setParameter("town",key);
	HttpService.setParameter("subDistrict",key);
	HttpService.setBusinessId("BIZ_common_queryAllDistrict");
	HttpService.doQuery(onSuccess,onFault);
}



/*
 *前端爬虫代码 
 * 1.把HttpService暴露给window
 * 2.把户编号变量把codeArr拷贝至控制台
 * 3.ajax根据户编号查出户信息
 * 4.户信息发给后端服务存取
 */

// HttpService 获取：点击查询按钮，自动断点
window.HttpService = HttpService;

//把codeArr拷贝至控制台

var houseCodeArr = JSON.parse(houseCodes),
	queryItem = 0;
var onSuccess = function (dataCenter) {
	window.DC = dataCenter;
	$.ajax({
		url:'http://shuaishuai.com:8888/',
		data:{dc:JSON.stringify(DC)},
		type:'post',
		dataType:'json',
		success:function(){}
	});
};

var onFault = function (err) {
	console.log(err);
};

var query = function(){
	if(queryItem >= houseCodeArr.length){
		return;
	}
	HttpService.setParameter("AAR040", 2016);
	HttpService.setParameter( "aac001", houseCodeArr[queryItem]);
	HttpService.setBusinessId("BIZ_PrFamilyMgr_GetProAndLivInfo");
	HttpService.doQuery(onSuccess,onFault);
	queryItem++;
};
setInterval(query,40);
