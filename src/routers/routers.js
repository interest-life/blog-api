var userRouter = require("./user/userRouter");

var routers = app=>{
    app.use('/api/user',userRouter);
}

module.exports = routers;