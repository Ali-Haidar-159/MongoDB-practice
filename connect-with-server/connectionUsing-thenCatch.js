// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let express = require("express") ;
let app = express() ;

let mongoose = require("mongoose") ;
mongoose.connect("mongodb://localhost:27017/messManagement") 
.then(function(){
    console.log("Database is connected") ;
})
.catch(function(err){
    console.log("Database is not connected because an error : " , err.message) ;
    process.exit(1) ;
})

// connect with server 

let port = 3000 ;

app.get("/" , function(req,res){
    res.send("home page") ;
}) ;

app.use(function(req,res,next){
    res.status(404).json({
        message : "page not found"
    })
})

app.listen(port , function(){
    console.log(`Server is running at http://localhost:${port}`) ;
})

// export codes 