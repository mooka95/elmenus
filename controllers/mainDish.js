const MainDish=require('../Models/MainDish');
const pool=require('../db');



exports.postMainDish=async(req,res,next)=>{
   const mainDish = new MainDish(req.body.name);
   mainDish.imageURL=req.file.path;
    saveToDatabase(mainDish);
    res.json({mainDish})
}
exports.getAllDishes=async(req,res,next)=>{
  const dishes=await pool.query('SELECT * FROM maindishes');
  res.json({dishes})

}

saveToDatabase=async (mainDish) => {
    const sql = "INSERT INTO maindishes (name,imageURL) VALUES ?";
    const values=[[mainDish.name,  mainDish.imageURL]]
     await  pool.query(sql,[values]); // make separate function to save to db
}