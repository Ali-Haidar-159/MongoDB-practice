// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let express = require("express") ;
let userRoute = express.Router() ;

const { getSignup, postSignup, postLogin, getLogin } = require("../controller/user.controller");
const { validationRules, validationRulesForLogin } = require("../validation/rules.validation");
const validationErrorHandling = require("../validation/handleError.validation");

// routing for server 

userRoute.get("/signup" , getSignup) ;
userRoute.post("/signup" , validationRules , validationErrorHandling ,postSignup) ;
userRoute.get("/login" ,getLogin) ;
userRoute.post("/login" , validationRulesForLogin , validationErrorHandling , postLogin) ;

// export codes 

module.exports = userRoute ;