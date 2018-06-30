var url = require("../../config/config").dbpath.url;
var MongoClient = require("mongodb").MongoClient;

new Promise((resolve,reject)=>{
    MongoClient.connect(url,(err,db)=>{
    if(err){
      reject("数据库连接失败！");
    }
    console.log("数据库已经创建");
    //var dbase = ;
    resolve(db.db("blog"));
   });
})
.then(dbase=>{
    console.log(dbase);
    return new Promise((resolve,reject)=>{
      dbase.createCollection('user',(err,res)=>{
        if(err) reject(err);
        console.log("集合已经创建");
        resolve(dbase);
      });
    })
},ero=>console.log(ero))
.then(dbase=>{
    console.log(dbase);
    var user = {name:"李桥",code:"11503080217",no:"admin",password:"admin"};
    dbase.collection("user").insertOne(user,(err,res)=>{
      if(err) return err;
      console.log("数据插入成功");
      dbase.close();
    })
},ero=>console.log(ero))
.catch(ero=>{
  console.log(ero);
});

