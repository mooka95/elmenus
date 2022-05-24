const Restaurant= require('../Models/Resturant');


exports.getAllRestaurants = async (req,res,next)=>{

}

exports.saveRestaurant = async (req,res,next)=>{
    const restaurant=new Restaurant(req.body.name,req.body.isOrderOnline,req.body.mainDishId);
    console.log(req.body.name)

    if(req.body.openTime&&req.body.closeTime){  
        restaurant.openTime=req.body.openTime;
        restaurant.closeTime=req.body.closeTime;
    }
    if(req.body.image)
        restaurant.image=req.file.path;

        saveToDatabase(restaurant);
        res.json({restaurant})
}

saveToDatabase=async (restaurant) => {
    const sql = "INSERT INTO restaurants (name,OrderOnline,OpenTime,CloseTime,ResturantImage,MainDishId) VALUES ?";
    const values=[[restaurant.name,restaurant.isOrderOnline,restaurant.openTime,restaurant.closeTime,restaurant.image,restaurant.mainDishId]]
     await  pool.query(sql,[values]); 
}