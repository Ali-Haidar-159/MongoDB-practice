// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let express = require("express") ;
let app = express() ;

let userRoute = require("./router/user.router") ;

let cors = require("cors") ;
let morgan = require("morgan") ;

// connect with server

app.use(express.urlencoded({extended:true})) ;
app.use(express.json()) ;
app.use(cors()) ;
app.use(morgan("dev")) ;
app.use(userRoute) ;

// req-res-cycle

app.get("/" , function(req,res){
    res.send("<h1>Home Page</h1>") ;
}) ;

app.use(function(req,res,next){
    res.status(404).json({
        status : 404 ,
        message : "page not found"
    })
})

// export codes 

module.exports = app ;