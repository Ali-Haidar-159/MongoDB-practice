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


app.get("/products" , async function(req,res){

    try
    {
        let allProducts = await products.find() ;

        if(allProducts)
        {
            res.status(200).json(allProducts) ;
        }
        else
        {
            res.status(401).json({
                message : "Can not find any product"
            })
        }

    }
    catch(err)
    {
        res.status(402).json({
            message : err.message 
        })
    }

}) ;

app.get("/products/:id" , async function(req,res){

    try
    {

        let id = req.params.id ;

        let singleProduct = await products.find({_id:id}) ;

        if(singleProduct)
        {
            res.status(200).json({
                success : true ,
                singleProduct 
            })
        }
        else
        {
            res.status(200).json({
                success : true ,
                message : "product not found" 
            })
        }

    }
    catch(err){

        res.status(404).json({
            message : err.message ,
            success : false
        })

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