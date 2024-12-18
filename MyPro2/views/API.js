var express = require('express');
var bodyParser = require("body-parser");
var mysql = require('mysql');
const cors = require('cors');
var app = express();
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// step 1: rong workbench mở cửa sổ sql và chạy lệnh 
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password'; 
//step 2:  
var con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root123",
    insecureAuth: true,
    database: "farms"
});
//step 1 
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!!!")
    var sql = "SELECT * FROM farms";
    con.query(sql, function (err, results) {
        if (err) throw err;
        console.log(results);
    })

});
//RESTFull API 
app.get('/getAllFarms', function (req, res) {
    var sql = "SELECT * FROM farms";
    con.query(sql, function (err, results) {
        if (err) throw err;
        res.send(results);
    });

})
var server = app.listen(5555, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
}) 