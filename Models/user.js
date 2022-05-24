const bcrypt = require('bcrypt');
const {jwtSecret,saltRounds}=require('../config');
const jwt = require('jsonwebtoken');
const util = require('util');
const Token=require('./token')
const signJwt=  util.promisify(jwt.sign);
const pool=require('../db');

class User{
    id;
    token;

    constructor(name,email,password){
        this.name = name;
        this.email = email;
        this.password = password;
    }
    setToken(token){
        this.token=token;

    }

     async hashpassword(){
         this.password = await bcrypt.hash(this.password,saltRounds);
     }
     async comparePassword(password){
       return await bcrypt.compare(password,this.password)

     }
     async generateToken(user){
         const tokenId=await signJwt({id:this.id},jwtSecret,{expiresIn: "1h"});
         const token =new Token(tokenId);
         const values=[ [token.id,user.id]]
         await pool.query("INSERT INTO tokens (id,userId) VALUES ?",[values]);
          this.token= token.id;

     }
     setId(id){
         this.id=id;
     }
     getId(){
         return this.id;
     }

}
module.exports = User;