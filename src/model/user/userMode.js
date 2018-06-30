var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    name:String,
    sex:String,
    age:Number,
    no:String,
    pwd:String
});

userSchema.index({index: 1});

var User = mongoose.model('User',userSchema);

module.exports = User;