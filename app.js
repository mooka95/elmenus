const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options=require('./swagger-options');
const specs=swaggerJsdoc(options);
const app = express();
require('express-async-errors');
const {port} = require('./config');
const userRouter=require('./Routes/user');
const mainDishRouter=require('./Routes/MainDish') ;
const restaurantRouter=require('./Routes/resturant');

app.use(express.json());


app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(specs))
app.use('/user',userRouter);
app.use('/maiDish',mainDishRouter);
app.use('/restaurant',restaurantRouter);
app.use((err,req,res,next)=>{
  err.statusCode=err.statusCode||500;
  const handleError=err.statusCode<500?err.message:"SomeThing Went Wrong";

  res.status(err.statusCode).json({
    message:handleError,
    errors:err.errors ||{}
  });
 

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})