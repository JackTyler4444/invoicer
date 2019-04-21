const http = require('http');
const express = require('express');
const bodyparser = require('body-parser');
const CryptoJS = require("crypto-js");

const app = express();
app.set('view engine', 'ejs');

const urlencodedParser = bodyparser.urlencoded({ extended: false});

app.get('/', function(req, res){
	res.render('index');
});

app.post('/form-one', urlencodedParser, function(req, res){
	testText = req.body.password;

	console.log(req.body.password);

	passwordVal = req.body.password;
	passwordVal = passwordVal.toString();
	console.log('test1: ', passwordVal);

	var ciphertext = CryptoJS.AES.encrypt(passwordVal, 'secret key 123');
 	var tester = ciphertext.toString();
 	console.log('test2  ', tester);
	console.log(req.body); 
	var plainJson = {encrypted: tester};
	console.log(plainJson); 
	res.render('success', {data: plainJson});
	
});

app.post('/form-two', urlencodedParser, function(req, res){
	console.log(req.body);

	passwordVal = req.body.invoice;
	invoiceVal = passwordVal.toString();

	var bytes  = CryptoJS.AES.decrypt(invoiceVal.toString(), 'secret key 123');
	var plaintext = bytes.toString(CryptoJS.enc.Utf8);
	var plaintexttwo = req.body.password;
	
	if (plaintext == plaintexttwo) {
		var plainJson = {encrypted: plaintext};
		console.log(plainJson); 
		res.render('success-two', {data: plainJson});
	}	
});

 const server = http.createServer((req, res) => {
  res.statusCode = 200;

  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Wrld me\n');
});

app.listen((process.env.PORT || 3000), function(){
	console.log('Server running on port 3000')
});