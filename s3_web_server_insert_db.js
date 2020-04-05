/*
 * 2020/3/23 Kyuho Kim
 * ekyuho@gmail.com 
 * GET으로 호출하는 경우.
 * http://localhost:8080/log?device=202&unit=3&type=T&value=24.2&seq=34
 */

var express = require('express');
var app = express();
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
var date = moment().format('YYYY-MM-DD HH:mm:ss');


mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'me',
    password: 'mypassword',
    database: 'mydb'
})
connection.connect();

var log_one = function (req, res){

  r = req.query;
  console.log("GET %j", r);

  insert_sensor(r.device, r.unit, r.type, r.value, r.seq, req.connection.remoteAddress);
  res.end('OK:' + JSON.stringify(req.query));
}

var random_recursive = function (req, res){


	var num = Math.floor(Math.random()*20);
	r={};
	r.device = num;
	r.unit = num;
	r.type = num;
	r.value = num;
	r.seq = num;
	r.ip = num;
  console.log("random insert!=%d",num);
  insert_sensor2(r.device, r.unit, r.type, r.value, r.seq, r.ip);
  //res.end('OK random number insert= '+ num);
	setTimeout(random_recursive, 5000);
}

function insert_sensor(device, unit, type, value, seq, ip) {
	obj = {};
	//var date = moment().format('YYYY-MM-DD HH:mm:ss');
  obj.seq = seq;
  obj.device = device;
  obj.unit = unit;
  obj.type = type;
  obj.value = value;
  obj.ip = ip.replace(/^.*:/, '')

  var query = connection.query('insert into sensors set ?', obj, function(err, rows, cols) {
    if (err) throw err;
    console.log("database insertion ok= %j", obj);
  });
}


function insert_sensor2(device, unit, type, value, seq, ip) {
	obj = {};
	//var date = moment().format('YYYY-MM-DD HH:mm:ss');
  obj.seq = seq;
  obj.device = device;
  obj.unit = unit;
  obj.type = type;
  obj.value = value;
  obj.ip = ip;

  var query = connection.query('insert into sensors set ?', obj, function(err, rows, cols) {
    if (err) throw err;
    console.log("database insertion ok= %j", obj);
  });
}

app.get('/', function(req, res) {
	//console.log(date);
  res.end('Nice to meet you');

});

app.get('/log', log_one);

app.get('/random', random_recursive);

/*
app.get('/log', function(req, res) {

  r = req.query;
  console.log("GET %j", r);

  insert_sensor(r.device, r.unit, r.type, r.value, r.seq, req.connection.remoteAddress);
  res.end('OK:' + JSON.stringify(req.query));
});
*/

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('listening at http://%s:%s', host, port)
});
