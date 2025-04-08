// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let mongoose = require("mongoose") ;

// connect with database 

async function connectDB ()
{
    try
    {
        await mongoose.connect("mongodb://localhost:27017/chat-hub") ;
        console.log("Database is connected") ;
    }
    catch(error)
    {
        console.log("Database is NOT connected") ;
        process.exit(1) ;
    }
}


// creating schema for collection/table 

let usersSchema = new mongoose.Schema({

    name : {
        type : String ,
        required : true
    },
    email : {
        type : String ,
        required : true
    } ,
    password : {
        type : String ,
        required : true
    } ,
    gender : {
        type : String ,
        required : true
    },
    subject : {
        type : String ,
        required : true
    }

}) ;

// creating collection/table 

let usersColl = mongoose.model("users" , usersSchema) ;


// export codes 

module.exports = {
    connectDB ,
    usersColl ,
} ;