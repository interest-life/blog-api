var express = require("express");
var fs = require("fs");
var url = require("url");

var userRouter = express.Router();

//定义该路由使用的中间件
// userRouter.use(function(req,res,next){
//     console.log("Time", Date.now());
//     console.log(__filename);
//     var pathname = url.parse(req.url).pathname;
//     console.log("pathname", pathname);
//     next();
// });

//定义该模块的跟路由
userRouter.get("/",function(req,res){
    res.send("res.send('Birds home page');");
    res.end(200);
})
//定义about模块的路由
userRouter.get("/login",function(req,res){
    console.log("数成功接收");
    console.log(req.params);
    res.send(JSON.stringify(req.params));
    res.end(200);
});

module.exports = userRouter;
