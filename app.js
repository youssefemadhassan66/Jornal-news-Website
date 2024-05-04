const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const multer  = require('multer');
const path = require('path');
const Port = 3000;
const _ = require("lodash");



const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Post array
const posts = [];

// Multr
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));}
});
const upload = multer({ storage: storage });


// Routs

// Home Route
app.get("/", function(req, res){
  res.render("Home",{posts:posts});
});

// Compose Route
app.get("/compose" ,function(req,res){
  res.render("compose");
})


app.get("/posts/:Title",function(req,res){  
  let  requestParameter = req.params.Title;
  posts.forEach(function(post){
    if(_.lowerCase(post.title) === _.lowerCase(requestParameter)){
      res.render("posts",{posts:posts});
    }
  });
 });


//Posts 
app.get("/posts", function(req,res){
  res.render("posts",{posts:posts});

});

// Post requests
app.post("/compose", upload.single("image"), function(req, res) {
  let post = {
    title: req.body.postTitle,
    content: req.body.postBody,
    publisher : req.body.Publisher,
    image: ""
  };

  if (req.file) {
    post.image = req.file.filename;
}
  posts.push(post);
  res.redirect("/");

});








app.listen(Port, () => {
  console.log(`Server listening at ${Port}`);
});