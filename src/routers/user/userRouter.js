var express = require("express");
var fs = require("fs");
var url = require("url");
var UserController = require('../../controller/user/userController');

var userRouter = express.Router();

//定义该模块的跟路由
userRouter.get("/",function(req,res){
    res.send("res.send('Birds home page');");
    res.end(200);
})
//定义about模块的路由
userRouter.post("/login",(req,res)=>{
    UserController.login(req,res);
});

userRouter.post("/register",(req,res)=>{
    UserController.register(req,res);
})

module.exports = userRouter;
