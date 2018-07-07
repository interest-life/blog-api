var User = require('../../model/user/userMode');
var Cookies = require("cookies");

class UserController {
    constructor(){

    }

    static register(req,res){
        var UserEntity = new User(req.body.data.user);
        console.log(UserEntity);
        UserEntity.save((err,doc)=>{
            console.log(err);
            if(err){
                console.log(err.stack);
                res.send({status: 500,message: '注册失败：' + err.stack});
                return;
            }
            else{
                res.send({status: 200,message: '注册成功'});
                return;
            }
        });
    }

    static login(req,res){
        var no = req.body.data.no;
        var pwd = req.body.data.pwd;
        User.findOne({"no":no},(err,user)=>{
            if(!user){
                res.send({message:"用户不存在，请注册！"});
                return;
            }
            else if(pwd!=user.pwd){
                res.send({message:"密码错误！"});
                return;
            }
            else{
                req.cookies.set("curUser",JSON.stringify(user));
                res.send({user:{userName:user.userName,no:user.no},message:"loginSuccess"});
                return;
            }
        });
    }

    static isUserExist(no){
        User.findOne().then((data)=>{
            if(data){
                return false;
            }
            return true;
        })
    }

    static checkLogin(req,res,next) {
        console.log(res.body);
        User.findOne({name:"DDD"}).then((data)=>{
            console.log(data);
            res.send("");
        });
    }
}

module.exports = UserController;