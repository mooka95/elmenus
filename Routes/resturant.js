const express=require('express');
const router = express.Router();
const multer=require('multer');
const path = require('path');
const restaurantController = require('../controllers/resturant');


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"Images/Restaurants")
    },
    filename:(req,file,cb)=>{
        console.log(file);
        cb(null,Date.now()+path.extname(file.originalname));

    }
});
const upload=multer({storage:storage});
router.post('/',upload.single('image'),restaurantController.saveRestaurant);



module.exports=router;