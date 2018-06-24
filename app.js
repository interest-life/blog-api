var express = require("express");
var http = require("http");
var https = require("https");
var url = require("url");
var config = require('./config/config');
var app = express();
//在应用中加载路由模块
var index = require("./src/routers/index");

//通过express的static托管项目的静态文件，例如图片、CSS、JavaScript 文件 如果你的静态资源存放在多个目录下面，你可以多次调用
//express.static
//中间件，例如app.use(express.static('files'));app.use(express.static('base'))
//访问静态文件的时候，express.static中间件会根据目录添加顺序查找所需文件 如果你希望所有通过 express.static 访问的文件都存放在一
/*
 *个“虚拟（virtual）”目录（即目录根本不存在）下面，可以通过为静态资源目录指定一个挂载路径的方式来实现，
 *如下所示：app.use('/static',express.static('public'))，这个时候访问的时候就可以通过带有/static前缀的地址访问public目录下面的文件了
*/
app.use('/static',express.static('public'));
//一个中间件，所有请求都会经过这个中间件
app.all(function(req,res,next){
  //设置跨域请求
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Methods","POST,GET,PUT,OPTIONS,DELETE");
  res.header("Access-Control-Allow-Headers","Content-Type");
  //默认情况下，跨域亲求不提供凭证（cookie，HTTP认证以及客户端SSL证明等），设置带请求凭证的时候需要指定这个字段
  res.header("Access-Control-Allow-Credentials","true");
  //支持HTTP1.1
  res.header("Cache-Control","no-cache,no-store,must-revalidate");
  //支持HTTP 1.0. response.setHeader("Expires", "0");
  res.setHeader("Pragma", "no-cache");
  next();
});

app.use('/api',index);

var server = app.listen(config.server.port,function(){
  console.log("SERVER IS RUNING!");
});

