// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let expressValidator = require("express-validator") ;


function validationErrorHandling (req,res,next)
{
    let err = expressValidator.validationResult(req) ;


    if(err.isEmpty())
    {
        next() ;
    }
    else
    {
        res.status(400).json({
            status : 400 ,
            errors : err.array() 
        })
    }

}


// export codes 

module.exports = validationErrorHandling ;