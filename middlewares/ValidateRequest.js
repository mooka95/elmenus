const {  validationResult } = require('express-validator');
const CustomError = require('../helpers/CustomerError');
const _ = require('lodash');


module.exports=(ValidateArray)=> async(req,res,next)=>{
    const promises=ValidateArray.map(validator=>validator.run(req));
    await Promise.all(promises);
    const {errors}= await validationResult(req);
    if(errors.length){
        throw new CustomError('Validation Error',422,_.keyBy(errors,'param'))
    }

   next();



}