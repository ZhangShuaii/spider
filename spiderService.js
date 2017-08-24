var areaMap = require('./areaMap');
var spiderDAO = require('./spiderDAO');
var poorfamilyArr=[],poorFamilyInfo = {},poorFamilyMember = [];
var DC = {};
//result8
var familyInfoParse = function(familyInfo){
	poorFamilyInfo.provinceCode = familyInfo.AAR002;
	poorFamilyInfo.cityCode = familyInfo.AAR003;
	poorFamilyInfo.countryCode = familyInfo.AAR004;
	poorFamilyInfo.townCode = familyInfo.AAR005;
	poorFamilyInfo.villageCode = familyInfo.AAR006;
	poorFamilyInfo.isOut = familyInfo.AAR010;
	poorFamilyInfo.bankCardId = familyInfo.AAC004;
	poorFamilyInfo.familyCode = familyInfo.AAC001;
	poorFamilyInfo.townName = areaMap.getTownName(poorFamilyInfo.townCode);
	poorFamilyInfo.villageName = areaMap.getVillageName(poorFamilyInfo.villageCode);

	poorFamilyInfo.mainReason = familyInfo.AAC007;
	poorFamilyInfo.otherReason = familyInfo.AAC008;
	poorFamilyInfo.phoneNumber = familyInfo.AAR012;
	poorFamilyInfo.registYear = familyInfo.AAR041;
	poorFamilyInfo.DBYear =familyInfo.AAR040 ;
	poorFamilyInfo.poorAttr =familyInfo.AAC006 ;
	poorFamilyInfo.bankCardName =familyInfo.AAQ002 ;
	poorFamilyInfo.outPoorYear =familyInfo.AAC016 ;
	poorFamilyInfo.isSoldierWifeHouse =familyInfo.AAC012 ;
	poorFamilyInfo.isOneChildHouse =familyInfo.AAC013 ;
	poorFamilyInfo.isTwoChildHouse =familyInfo.AAC014 ;
};


//result1
var familyInfoParse2 = function(familyInfo2){
	poorFamilyInfo.houseArea =familyInfo2.AAC317 ;
	poorFamilyInfo.distanceFromRoad =familyInfo2.AAC315 ;
	poorFamilyInfo.roadType =familyInfo2.AAC316 ;
	poorFamilyInfo.isDangerHouse =familyInfo2.AAC318 ;
	poorFamilyInfo.hasTV =familyInfo2.AAC314 ;
	poorFamilyInfo.dangerHouseLevel =familyInfo2.AAC322 ;
	poorFamilyInfo.hasElectricOfLive =familyInfo2.AAC313 ;
	poorFamilyInfo.isSafeWater =familyInfo2.AAC312 ;
	poorFamilyInfo.isDifficultWater =familyInfo2.AAC311 ;
	poorFamilyInfo.mainFuelType =familyInfo2.AAC320 ;
	poorFamilyInfo.hasCleanWC =familyInfo2.AAC319 ;
	// poorFamilyInfo.hasCleanWC =familyInfo2.AAC319 ;
};

//result3
var incomeParse = function(income){
	poorFamilyInfo.minimumFund = income.AAC077 ;
	poorFamilyInfo.fiveFund = income.AAC086 ;
	poorFamilyInfo.oldAgeFund = income.AAC087 ;
	poorFamilyInfo.sellIncome = income.AAC071 ;
	poorFamilyInfo.expend = income.AAC074 ;
	poorFamilyInfo.salaryIncome = income.AAC073 ;
	poorFamilyInfo.averageFund = income.AAC082 ;
	poorFamilyInfo.resourceIncome = income.AAC072 ;
	poorFamilyInfo.transferIncome = income.AAC085 ;
};

//result2
var result2Parse = function(result2){
	poorFamilyInfo.cultivatedArea = result2.AAC301 ;
	poorFamilyInfo.irrigatedArea = result2.AAC302 ;
	poorFamilyInfo.forestlandArea = result2.AAC303 ;
	poorFamilyInfo.returnArea = result2.AAC304 ;
	poorFamilyInfo.fruitArea = result2.AAC305 ;
	poorFamilyInfo.grassArea = result2.AAC306 ;
	poorFamilyInfo.poolArea = result2.AAC307 ;
	poorFamilyInfo.hasElectricOfProduct = result2.AAC308 ; 
	poorFamilyInfo.hasJoinOrg = result2.AAC084 ;  
};

//result4
var familyMemberParse = function(memberArr){
	memberArr.forEach(function(val,key){
		var member = {};
		member.peopleCode = val.data.AAB001;
		member.name = val.data.AAB002;
		member.sex = val.data.AAB003;
		member.idNumber = val.data.AAB004;
		member.birthday = val.data.AAB005;
		member.familyRelation = val.data.AAB006;
		member.nation = val.data.AAB007;
		member.education = val.data.AAB008;
		member.grade = val.data.AAB009;
		member.workSkills = val.data.AAB010;
		member.workMonth = val.data.AAB012;
		member.healthInfo = val.data.AAB017;
		member.numerType = val.data.AAB018;
		member.memerStatus = val.data.AAB015;
		member.mobile = val.data.AAB031;
		member.isSoldier = val.data.AAB019;
		member.isMini = val.data.AAB030;
		member.companyName = val.data.AAB029;
		member.politicStatus = val.data.AAK033;
		member.workCity = val.data.AAB025;
		if(DC.body.dataStores["result9"].rowSet.primary[key]!=undefined){
			member.isBuyMedicare = DC.body.dataStores["result9"].rowSet.primary[key].data.AAB022;
		}
		poorFamilyMember.push(member);
	});
};


var setPoorFamilyInfo = function (years,dataArr) {
	dataArr.forEach(function(dc,key){
		DC = dc;
		var familyInfo = dc.body.dataStores["result8"].rowSet.primary[0],
			familyInfo2 = dc.body.dataStores["result1"].rowSet.primary[0],
			incomeInfo = dc.body.dataStores["result3"].rowSet.primary[0],
			memberArr = dc.body.dataStores["result4"].rowSet.primary;
			result2 = dc.body.dataStores["result2"].rowSet.primary[0];

		if(familyInfo && memberArr && familyInfo2){
			familyInfoParse(familyInfo.data);
			familyInfoParse2(familyInfo2.data);
			incomeParse(incomeInfo.data);
			result2Parse(result2.data);
			familyMemberParse(memberArr);

			poorFamilyInfo.poorFamilyMember = poorFamilyMember;
			poorfamilyArr.push(poorFamilyInfo);
			poorFamilyInfo = {};
			poorFamilyMember = [];
		}else{
			console.log(dc.body.parameters.aac001 + "信息异常");
		}
	});

	spiderDAO.add(years,poorfamilyArr);
};

exports.setPoorFamilyInfo = setPoorFamilyInfo;