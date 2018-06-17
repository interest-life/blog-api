var express = require("express");
var fs = require("fs");
var url = require("url");

var router = express.Router();

//定义该路由使用的中间件
router.use(function(req,res,next){
  console.log("Time", Date.now());
  console.log(__filename);
  var pathname = url.parse(req.url).pathname;
  console.log("pathname", pathname);
  next();
});

//定义该模块的跟路由
router.get("/",function(req,res){
  res.send("res.send('Birds home page');");
})
//定义about模块的路由
router.get("/login",function(req,res){
  fs.readFile("./src/views/login.html",function(err,data){
    if(err){
      console.log(err);
      res.writeHead(404,{'Content-Type':'text/html'});
      res.end();
    }else{
      res.writeHead(404,{'Content-Type':'text/html'});
      res.write(data.toString());
      res.end();
    }
  })
});

module.exports = router;
