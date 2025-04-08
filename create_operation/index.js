// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let express = require("express") ;
let app = express() ;

let mongoose = require("mongoose") ;
let morgan = require("morgan") ;
let chalk = require("chalk") ;
require("dotenv").config() ;

// connect with server 
app.use(express.urlencoded({extended:true})) ;
app.use(express.json()) ;
app.use(morgan("dev")) ;


// connection with database 

async function connectionWithMongoDB ()
{

    try
    {
        await mongoose.connect("mongodb://localhost:27017/multiplane") ;
        console.log("database is successfully connected") ;
    }
    catch(err)
    {
        console.log("There is an error to connect the database : ",err.message) ;
        process.exit(1) ;
    }

}

let productSchema = new mongoose.Schema({

    title : {
        type : String ,
        required : true
    } ,
    price : {
        type : Number ,
        required : true
    } ,
    description : {
        type : String ,
        required : true
    } ,
    createdAt : {
        type : Date ,
        default : Date.now ()
    }

});

let products = mongoose.model("products" , productSchema) ;

// route  handler 

app.get("/" , function(req,res){
    res.send("This is home page") ;
}) ;


app.post("/products" ,async function(req,res){

    try
    {
        let {title,price,description} = req.body ;

    let newProduct = new products({

        title : title ,
        price : price ,
        description : description

    })

    await newProduct.save() ;

    res.status(200).json(newProduct) ;
    }
    catch(err)
    {
        res.status(402).send(err.message) ;
    }

})



app.use(function(req,res,next){
    res.status(404).json({
        status : 404 ,
        message : "page not found" 
    }) ;
}) ;

const port = process.env.PORT ;

app.listen(port , async function(){
    console.log(chalk.bgRed.white.bold.italic(`Server is running at http://localhost:${port}`)) ;
    await connectionWithMongoDB() ;
})  ;


// export codes 