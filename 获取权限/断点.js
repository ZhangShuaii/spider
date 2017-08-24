//menudata.js
//1119行：document.getElementById("msg").innerHTML = "";

var sumParam = {
	token :dc.body.parameters.AccessToken.token,
	account:dc.body.parameters.AccessToken.account,
	SYSDATE:dc.body.parameters.SYSDATE,
	AccInfo:dc.body.parameters.AccInfo,
	aar099:dc.body.parameters.userCompAuthority.aar099,
	aar098:dc.body.parameters.userCompAuthority.aar098,
}
dc = JSON.parse(dcStr);

dc.body.parameters.AccessToken.token = sumParam.token;
dc.body.parameters.AccessToken.account = sumParam.account;
console.log(sumParam.account);
// dc.body.parameters.AccessToken.account = '34150300501';
dc.body.parameters.SYSDATE = sumParam.SYSDATE;
// dc.body.parameters.AccInfo = sumParam.AccInfo;

//menudata.js
dc.body.parameters.AccInfo = {
    "orgcode": "340000000000",
    "orgname": "安徽省",
    "orglevel": "20",
    "usraccount": "340000000000",
    "usrname": "安徽省"
}

/*dc.body.parameters.userCompAuthority.aar099 = sumParam.aar099;
dc.body.parameters.userCompAuthority.aar098 = sumParam.aar098;*/