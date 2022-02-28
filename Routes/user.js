
const express=require('express');
const router = express.Router();
const { body } = require('express-validator');
const User = require('../Models/user');
const CustomError=require('../helpers/CustomerError')
const pool=require('../db');
// const query = utils.promisify(connection.query).bind(connection);
const validateRequest=require('../middlewares/ValidateRequest')



router.post('/register',validateRequest([
    body('name').exists(),
    body('email').isEmail(),
    body('email').exists(),
    body('password').isLength({ min: 6 })

]),async (req,res)=>{

    const user=new User(req.body.name,req.body.email,req.body.password);
   await user.hashpassword();
    const sql=await  pool.query("INSERT INTO users SET ?;",user);
    res.json({
        user
    });





})

router.post('/login',async(req,res,next)=>{
    const userBody= await pool.query("SELECT * FROM users WHERE email=?",req.body.email);
    if(!userBody){
      throw new CustomError("Wrong emailor password",401)
    }
    const user=new User(userBody[0].name,userBody[0].email,userBody[0].password);
      user.id=userBody[0].id;
    const isMatch= await user.comparePassword(req.body.password);
    if(!isMatch){
        throw  new CustomError("Wrong userName or password",401);
    }
    const token= await user.generateToken();
    const values=[ [token,user.id]]
    const savedToken= await  pool.query("INSERT INTO tokens (id,userId) VALUES ?",[values]);
    const name=user.name;
    const email=user.email;
    res.json({
        name,
        email,
        token
    })

})




module.exports=router;