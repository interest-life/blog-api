var express = require("express");

var router = express.Router();

//定义该路由使用的中间件
router.use(function(req,res,next){
  console.log("Time", Date.now());
  next();
});

//定义该模块的跟路由
router.get("/",function(req,res){
  res.send("res.send('Birds home page');");
})

//定义about模块的路由
router.get("/about",function(req,res){
  res.send("This is about me");
});

module.exports = router;
