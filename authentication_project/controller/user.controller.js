
// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let path = require("path"); 
const { usersColl } = require("../model/user.model");

// controllers

let getSignup = function(req,res){
    res.status(200).sendFile(path.join(__dirname , ".." , "/view" , "/signup.view.html"));
}


let postSignup = async function(req,res){

    let {name,email,password,gender,subject} = req.body ;

    let newUser = new usersColl({
        name ,
        email ,
        password ,
        gender ,
        subject
    }) ;

    await newUser.save() ;

    res.status(200).json({
        success : true ,
        status : 200 ,
        message : "user id created"
    })

}

let getLogin = function(req,res){
    res.status(200).sendFile(path.join(__dirname , ".." , "/view" , "/login.view.html"));
}

let postLogin = async function(req,res){

    let inputEmail = req.body.email ;
    let inputPassword = req.body.password ;


    let data = await usersColl.findOne({ email: inputEmail });

    let originalEmail = data.email ;
    let originalPassword = data.password ;
    
    if(inputEmail === originalEmail && inputPassword === originalPassword)
    {
        res.status(200).send("<h1>Login Successful") ;
    }
    else
    {
        res.status(401).json({
            status : 401 ,
            success : false ,
            message : "Not login . email or password is incorrect."
        })
    }
    

}


// export codes 

module.exports = {

    getSignup ,
    postSignup ,
    postLogin ,
    getLogin ,

}