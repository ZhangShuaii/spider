var app = require('express')();
var bodyParser = require('body-parser');
var multer = require('multer'); 

app.use(bodyParser.json({limit:'10mb'}));
app.use(bodyParser.urlencoded({limit:'10mb', extended: true })); 

var dcArr = [];
var spiderService = require('./spiderService');
var updateTime = new Date();

app.post('/', function (req, res) {
    if(req.body){
  	var fs = require("fs");
    var dcJson = JSON.parse(req.body.dc);
    dcArr.push(dcJson);

    if(dcArr.length>=1000){
        spiderService.setPoorsHelper(dcArr);
        dcArr = [];
        updateTime = new Date();
    }
  }
  res.end('success');
}).listen(8080);

//1分钟没请求 自动存储缓存区的数据
setInterval(function(){
  if((new Date() - updateTime) > (1000*5)){
    if(dcArr.length > 0 ){
      spiderService.setPoorsHelper(dcArr);
      dcArr = [];
      updateTime = new Date();
      console.log('timecheck update');
    }
  }
},1000);