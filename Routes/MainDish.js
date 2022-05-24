const express=require('express');
const router = express.Router();
const multer=require('multer');
const path = require('path');
const mainDishController = require('../controllers/mainDish');
const validateRequest=require('../middlewares/ValidateRequest');
const { body } = require('express-validator');


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"Images/MainDishes")
    },
    filename:(req,file,cb)=>{
        console.log(file);
        cb(null,Date.now()+path.extname(file.originalname));

    }
});
const upload=multer({storage:storage});

router.post('/',validateRequest([
    body('name').exists()
]),upload.single('image'),mainDishController.postMainDish);
router.get('/',mainDishController.getAllDishes);
module.exports=router;