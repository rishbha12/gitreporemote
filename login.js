var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'server'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));


app.get('/', function(request, response) {
	//response.sendFile(path.join(__dirname + '/views/index.html'));
	response.render("index.ejs");
});

app.get('/register',function(req,res){
	res.render("register.ejs");
});


app.post('/reg_auth',function(req,res){
	var name = req.body.name;
	var username = req.body.id;
	var password = req.body.pass;
	if(username && password)
	{
		connection.query('Insert into register values(?,?,?)',[username,password,name],function(err,result,fields){
			if(err) throw err;
			req.session.loggedin = true;
			req.session.username = username;
			res.redirect('/home');
		});
	}
})

app.post('/auth', function(request, response) {
	var username = request.body.id;
	var password = request.body.pass;
	if (username && password) {
		connection.query('SELECT * FROM register WHERE Id = ? AND Password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = results[0].Name;
				response.redirect('/home');
			} else {
				response.send('<script>alert("Incorrect Username and/or Password");</script>');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(3000);