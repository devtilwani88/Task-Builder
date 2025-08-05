const express = require('express') //express
const app = express(); //express
const path = require('path'); //path 
const fs = require('fs'); //file system

app.set("view engine", "ejs"); //dynamic pages
app.use(express.json()); //Parses JSON data from requests
app.use(express.urlencoded({extended : true})); //Parses form data (from HTML forms).
app.use(express.static(path.join(__dirname,"public"))); //serves static files (like HTML, CSS, JS, images)

app.get("/",function(req, res){
    fs.readdir(`./files`, function(err,files){
        res.render("index",{files:files});
    })
})

app.get("/file/:filename",function(req, res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8", function(err,filedata){
        res.render('show', {filename: req.params.filename, filedata:filedata});
    })
})

app.get("/edit/:filename",function(req, res){
    res.render('edit', {filename: req.params.filename});
    })


app.post("/edit",function(req, res){
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
        res.redirect("/")
    })
});

app.post("/create",function(req, res){
     fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
        res.redirect("/");
     });
});


app.listen(3000);