var http = require("http");
var https = require("https");
var url = require("url");
var express = require("express");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var Cookies = require("cookies");

var config = require('./config/config');
var routers = require("./src/routers/routers");

var app = express();

/*通过express的static托管项目的静态文件，例如图片、CSS、JavaScript 文件 如果你的静态资源存放在多个目录下面，你可以多次调用
 *express.static
 *中间件，例如app.use(express.static('files'));app.use(express.static('base'))
 *访问静态文件的时候，express.static中间件会根据目录添加顺序查找所需文件 如果你希望所有通过 express.static 访问的文件都存放在一
 *个“虚拟（virtual）”目录（即目录根本不存在）下面，可以通过为静态资源目录指定一个挂载路径的方式来实现，
 *如下所示：app.use('/static',express.static('public'))，这个时候访问的时候就可以通过带有/static前缀的地址访问public目录下面的文件了
*/

app.use(cookieParser())
app.use(bodyParser.json());//for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));// for parsing application/x-www-form-urlencoded

app.use('/static',express.static('public'));

app.all('*',(req,res,next)=>{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Methods","POST,GET,PUT,OPTIONS,DELETE");
  res.header("Access-Control-Allow-Headers","Content-Type");
  res.header("Access-Control-Allow-Credentials","true");//可以带cookies
  res.header("Cache-Control","no-cache,no-store,must-revalidate");//支持HTTP1.1
  res.header("Pragma", "no-cache");//支持HTTP 1.0. response.setHeader("Expires", "0");

  console.log("{请求方式：[",req.method,"],","\n请求路径：[",req.path,"],","\n请求参数：[",req.params,"]}");

  if(req.method=="OPTIONS"){
    res.send(200);
  }
  else{
    next();
  }
});

//cookies中间件
app.use((req,res,next)=>{
  req.cookies = new Cookies(req,res);
  console.log(req.body);
  next();
});


routers(app);

//404处理
app.use((req,res,next)=>{
   res.status(404);
   res.send(JSON.stringify({code:"404",message:"您请求的资源未找到",externalMes:""}));
});

//错误处理
app.use((err,req,res,next)=>{
  res.status(err.status || 500);
  res.send(JSON.stringify({code:"50x",message:"请求过程中出现错误，请联系管理员",externalMes:err.message}))
});

var server = app.listen(config.server.port,function(){
  console.log("服务器启动成功!");
  console.log("---------------数据库连接中------------");
  mongoose.connect(config.dbpath);
  const db = mongoose.connection;
  db.on("open",()=>{
    console.log("<数据库连接成功>");
  });
  db.on("error",(err)=>{
    console.log("<数据库连接异常>",err.stack);
  });
  db.on('close', function() {
    console.log('<数据库断开，重新连接数据库>');
    mongoose.connect(dbpath);
  });
});

