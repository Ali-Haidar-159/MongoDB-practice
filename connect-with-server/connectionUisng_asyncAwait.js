// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let express = require("express") ;
let app = express() ;

let chalk = require("chalk") ;

let mongoose = require("mongoose") ;

async function connectWithDB()
{
    try{
        await mongoose.connect("mongodb://localhost:27017/College")  ;
        console.log("Database is connected") ;
    }
    catch(err){
        console.log(err.message) ;
        process.exit(1) ;
    }
}



// connect with server 

let portNumber = 3000 ;

app.get("/" , function(req,res){
    res.json({
        page : "home page"
    }) ;
});

app.use(function(req,res,next){
    res.status(404).json({
        status : 404 ,
        message : "page not found"
    }) ;
});

app.listen(portNumber , async function(){

    console.log(chalk.bgGray.bold.italic(`Server is running at http://localhost:${portNumber}`)) ;
    await connectWithDB() ;
})

// export codes 