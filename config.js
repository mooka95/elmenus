require('dotenv').config();
const requiredEnvs=['host','user','database'];
const missingEnvs=requiredEnvs.filter(envName => !process.env[envName]);
if(missingEnvs.length){
   throw new Error(`missing required envs ${missingEnvs}`)
}





module.exports={
    saltRounds:process.env.SALT_ROUNDS ||7,
    jwtSecret:process.env.JWT_SECRET,
    port:process.env.PORT ||3000,
    host:process.env.host,
    user:process.env.user,
    database:process.env.database
}