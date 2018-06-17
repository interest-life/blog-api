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
//路由入口
app.use('/blog',index);

//启动一个服务并监听从3000端口进入的所有连接请求，这里将会对所有的请求路径为/的返回hello-world，对于其它的路径都会返回404NOT FOUND
// var server = app.listen(8686,function(){
//   var host = server.address().address;
//   var port = server.address().port;
//   console.log("server listen at http://%s:%s",host,port);
// });

http.createServer(app).listen(config.server.port,function(){
  console.log("SERVER IS RUNING!");
});

