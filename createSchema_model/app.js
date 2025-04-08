// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let express = require("express") ;
let app = express() ;

// connection with database 

let mongoose = require("mongoose") ;
const { type } = require("os");

// create schema and model
let mySchema = new mongoose.Schema({
    productName : String ,
    price : {
        type : Number ,
        required : true
    } 
}) ;

let productsCollection = mongoose.model("products" , mySchema) ;

// connection with DB 

async function connectionWithDatabase()
{
    try
    {
        await mongoose.connect("mongodb://localhost:27017/amar-dokan") ;
        console.log("database is connected") ;

    }
    catch(err)
    {
        console.log("The error name is : " , err.message) ;
        process.exit(1) ;
    }   
}

// routing 

app.get("/" , function(req,res){
    res.send("home page") ;
}) ;

app.use(function(req,res,next){
    res.status(404).json({
        message : "Page not found"
    })
})

// export codes 

module.exports = {
    app , 
    connectionWithDatabase ,
} ;