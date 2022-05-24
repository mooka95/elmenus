
const expect= require("chai").expect;
const sinon = require("sinon");
const pool=require("../db");
const userController=require("../controllers/user");
const CustomError=require("../helpers/CustomerError");



describe("userRoute-login", function() {
     
  // it("it should  throw an error  wit code 500 if accessing the databases fails",function(done) {
  //   sinon.stub(pool, 'query').throws();
    
  
  //   const req = {
  //     body: {
  //       email: 'test@test.com',
  //       password: 'tester'
  //     }
  //   };
  //      userController.login(req,{},()=>{}).then(result=>{
        
  //       expect(result).to.be.an('error');
  //       expect(result).to.have.property('statusCode', 500);
  //       done();

  //      });
    

  //     pool.query.restore();



  // });

  it("it should  throw an error  with code 401 when not returning user from database  ", async ()=> {
   
   sinon.stub(pool,"query").returns([]);

    const req={
        body: {
            email:'test@example.com',
            password:'test'
        }
    }

  const result=await userController.login(()=>req,{},()=>{});
 
    // expect(result).to.have.property('statusCode', 401);
    // expect(result).to.have.property('message', 'Wrong email or password');
    expect(result).to.be.rejectedWith(CustomError);
    pool.query.restore();



});


  });