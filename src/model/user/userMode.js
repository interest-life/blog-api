var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    userName:String,
    no:String,
    pwd:String
});

userSchema.index({index: 1});

var User = mongoose.model('user',userSchema);

module.exports = User;