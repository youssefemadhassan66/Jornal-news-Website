const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { lowerCase } = require("lodash");
const Port = 3000;

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



// Routs 
app.get("/", function(req, res){
  res.render("Home");
});




app.listen(Port,function(){
    console.log("Port 3000 is running successfully");
})