var express = require('express');
var bodyParser = require('body-parser');
var app = express();
console.log("Hello World");



app.use(function middleware(req, res, next){
    var _logstr = req.method + " " + req.path + " - " + req.ip;
    console.log(_logstr);
    next();
});


app.use("/public", express.static(__dirname + "/public"));
app.get("/", function(req,res){
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/json", function(req,res){
    var _msg = "Hello json";
    if (process.env.MESSAGE_STYLE==="uppercase"){
        _msg = _msg.toUpperCase();
    }

    res.json({"message":_msg});
});

app.get("/now", function(req, res, next){
    req.time = new Date().toString();
    next();
}, function(req, res){
    res.json({"time":req.time});
});

app.get("/:word/echo", function(req, res){
    res.json({"echo":req.params.word});
});

app.get("/name", function(req, res){
    var name = req.query.first||null;
    var lastname = req.query.last||null;
    var fullname = (!!name&&!!lastname) ? name + " " + lastname : "";
    res.json({"name":fullname});
});

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.post("/name", function(req, res){
    var name = req.body.first||null;
    var lastname = req.body.last||null;
    var fullname = (!!name&&!!lastname) ? name + " " + lastname : "";
    res.json({"name":fullname});
});



 module.exports = app;
