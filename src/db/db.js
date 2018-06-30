var mongoose = require("mongoose");
var dbpath = require("../../config/config").dbpath;

mongoose.connect(dbpath);

const db = mongoose.connection;

db.once('open',()=>{
    console.log("数据库连接到：",dbpath);
});

db.on("error",(err)=>{
    if(err){
        console.Error(err);
        mongoose.disconnect();
    }
});

db.on('close', function() {
    console.log('数据库断开，重新连接数据库');
    mongoose.connect(dbpath);
});

export default db;