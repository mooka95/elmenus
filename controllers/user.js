
const User = require('../Models/user');
const CustomError=require('../helpers/CustomerError');
const pool=require('../db');

exports.signUp=async (req,res,next)=>{
    const user=new User(req.body.name,req.body.email,req.body.password);
    await user.hashpassword();
    const sql = "INSERT INTO users (name, password,email) VALUES ?";
    const values=[[user.name,user.password,user.email]]
     await  pool.query(sql,[values]);
     res.json({
         user
     });

}

exports.login=async (req,res,next)=>{
    
    const userBody= await pool.query("SELECT * FROM users WHERE email=?",req.body.email);
    if(userBody.length===0){
      throw new CustomError('Wrong email or password',401);
    }
    const user=new User(userBody[0].name,userBody[0].email,userBody[0].password);
    const isMatch= await user.comparePassword(req.body.password);
    if(!isMatch){
        throw  new CustomError("Wrong userName or password",401);
    }
    user.id=userBody[0].id;
    await user.generateToken(user);

    res.json({
        user
    });



}