
window.HttpService = HttpService;

var onSuccess = function (dataCenter) {
	window.DC = dataCenter;
	$.ajax({
		url:'http://shuaishuai.com:8080/',
		data:{dc:JSON.stringify(dataCenter)},
		type:'post',
		dataType:'json',
		success:function(){}
	});
	console.log(dataCenter);
};
var onFault = function (err) {
	console.log(err);
};

HttpService.setParameter("AAR040", 2016);
// HttpService.setParameter( "aac001", 3111318508);
HttpService.setParameter( "AAR008", 34 );
HttpService.setParameter("AAB004",'342421196510244314');		//身份证号码
// HttpService.setParameter( "aar006",'341503015013' );		//村编号
HttpService.setBusinessId( "biz_query_helpinfo" );
HttpService.doQuery(onSuccess,onFault);

/*轮询*/
var houseCodeArr = JSON.parse(houseCodes),
	queryItem = 0;
var onSuccess = function (dataCenter) {
	window.DC = dataCenter;
	$.ajax({
		url:'http://shuaishuai.com:8080/',
		data:{dc:JSON.stringify(dataCenter)},
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
	HttpService.setParameter( "AAR008", 34 );
	HttpService.setBusinessId( "query_poorfamily_relatived" );
	HttpService.doQuery(onSuccess,onFault);
	queryItem++;
};
setInterval(query,40);