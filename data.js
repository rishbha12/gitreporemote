var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "server"
});


con.connect(function(err){
	if(err) throw err;
	console.log("Connected to database");
	con.query("Select * from login",function(err,result){
		if(err) throw err;
		console.log(result.length);
	});
});