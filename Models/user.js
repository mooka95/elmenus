const bcrypt = require('bcrypt');
const {jwtSecret,saltRounds}=require('../config');
const jwt = require('jsonwebtoken');
const util = require('util');
const Token=require('./token')
const signJwt=  util.promisify(jwt.sign);

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
     async generateToken(){
         const tokenId=await signJwt({id:this.id},jwtSecret,{expiresIn: "1h"});
         const token =new Token(tokenId)
         return token.id;

     }
     setId(id){
         this.id=id;
     }
     getId(){
         return this.id;
     }

}
module.exports = User;