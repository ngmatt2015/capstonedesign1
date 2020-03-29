//setting and what to use
const http=require('http')
const express=require('express')
const bodyParser=require('body-parser')
const moment=require('moment')
const ip=require('ip')
const fs=require('fs')
const hostname='172.31.42.134'
const port=8000

require('moment-timezone');
moment.tz.setDefault("Asia/Seoul")
var app=express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/',function(req,res){
	var g=req.query
	g.email="ngmatt2015@gmail.com"
	g.stuno="20151560"
	g.time=moment().format("YYYY-MM-DD HH:MI:SS")
	g.ip=ip.address()

	console.log(g)	//write log in shell
	fs.appendFile(JSON.stringify(g)+"\n",'utf8',
		function(error,data){
		if(error) {throw error};
	})
	res.send(JSON.stringify(g))
})

app.post('/',function(req,res){
	var p=req.body
	p.email="ngmatt2015@gmail.com"
	p.stuno="20151560"
	p.time=moment().format("YYYY-MM-DD HH:MI:SS")
	p.ip=ip.address()

	console.log(p)
	fs.appendFile(JSON.stringify(p)+"\n",'utf8',
		function(error,data){
		if(error) {throw error};
	})
	res.send(JSON.stringify(p))
})

app.listen(port,hostname,() => console.log(`Example server listening on host ${hostname} port ${port}`))
