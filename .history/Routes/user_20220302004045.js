
const express=require('express');
const router = express.Router();
const { body } = require('express-validator');
const User = require('../Models/user');
const CustomError=require('../helpers/CustomerError')
const pool=require('../db');
const validateRequest=require('../middlewares/ValidateRequest');
/**
 * @swagger
 * components:
 *  schemas:
 *     user:
 *      type: object
 *      required:
 *       - name
 *       - email
 *       - password
 *      properties:
 *        id:
 *         type: integer
 *         description: auto-generated property of user
 *        name:
 *         type: string
 *         description: name of user
 *        email:
 *         type: string
 *         description: email of user
 *        password:
 *         type: string
 *         description: password of user
 *        token:
 *         type: string
 *         description: token of user
 *      example: 
 *       id:56
 *       name:ahmed
 *       email:ahmed@gmail.com
 *       password:ddadxasx
 *       token:sssadsdsdjj
 *   
 *   
 */
/**
 * @swagger
 *  tags:
 *    name: users
 *    description: users registered in app
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: create new user
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: The user was successfully registerd
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: login a user
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: The user was successfully logged In
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       500:
 *         description: Some server error
 */
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
    const id=user.id;
    const name=user.name;
    const email=user.email;
    res.json({
        id,
        name,
        email,
        token
    })

})




module.exports=router;