var userRouter = require("./user/userRouter");

export default routers=>{
    routers.use('/user',userRouter);
}