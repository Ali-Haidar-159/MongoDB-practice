// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

const { app , connectionWithDatabase } = require("./app");

let chalk = require("chalk") ;


let port = 3000 ;

app.listen(port , async ()=>{
    console.log(chalk.bold.italic.red((`Server is running at http://localhost:${port}`))) ;
    await connectionWithDatabase() ;
})

// export codes 