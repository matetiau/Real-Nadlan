var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "matekamer@gmail.com",
  password: "Chuj1989"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});