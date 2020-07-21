var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var mysql = require('mysql');

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "server"
});

app.get('/signin',function(req,res){
	res.render("login");
});




app.post('/signin',function(req,res){
	var id = req.body.id;
	var pass = req.body.pass;
	
	con.connect(function(err){
		if(err) throw err;
		var sql = "Select * from login where Id=? and Password=?";
		con.connect("Select * from login where Id=? and Password=?",[id,pass],function(err,result){
			if(err) throw err;
			console.log(result.length);
			if(result.length>0)
			{
				res.send("welcome");
			}
		});

	});
	
});

app.listen(3000,function(){
	console.log("Server Started!");
});