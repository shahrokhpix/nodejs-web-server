const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

app.use(express.static(__dirname + "/public"));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

//middelware
app.use((req,res,next)=>{
  
    var log = new Date().toString() +" UserMethod: "  +req.method+ " UserUrl: " + req.url +"\n";
    fs.appendFileSync("server.log" , log);
    next();
});
//helper 
hbs.registerHelper("currentdate" , ()=>{
        return new Date().getFullYear();
});
//filter
hbs.registerHelper("upperCase" , (text)=>{
    return text.toUpperCase();
})

app.listen(3000,(err , res)=>{
    if(err)
        console.log("There is an error");
    else
        console.log("server is run on port 3000");
});

app.get('/hello',(req , res)=>{
   res.send("Hello World!");
});

app.get('/about' , (req , res)=>{

     res.render('about.hbs' ,{
         titlename : "درباره ما",
         about : "توضیحی درباره ما"
     });
});

app.get('/' , (req , res)=>{

    res.render('home.hbs' ,{
        titlename : "main page",
        home : "home menu"
    });
});



