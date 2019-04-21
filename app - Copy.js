const http = require('http');
const express = require('express');
const bodyparser = require('body-parser');
const CryptoJS = require("crypto-js");

// old code
//const hostname = '127.0.0.1';
//const port = 3000;


//init express
const app = express();
app.set('view engine', 'ejs');

//init body parser
const urlencodedParser = bodyparser.urlencoded({ extended: false});


//app.use(express.static(__dirname + '/public'));

//set homepage
 //Display 2 forms
  //
		  //Form one input box for password
  		  //and output for invoice string

  		  //form two input box for password
  		  //output box for users purchased 
  		  //data string (sucess alert)
app.get('/', function(req, res){
	res.render('index');
});

//first form submit action
app.post('/contact', urlencodedParser, function(req, res){
	testText = req.body.password;

	console.log(req.body.password);
	//var bodyData = req.body.password;
	//console.log(bodyData);
	//console.log(req.body.password);
	passwordVal = req.body.password;
	passwordVal = passwordVal.toString();
	console.log('test1: ', passwordVal);
	// Encrypt
	var ciphertext = CryptoJS.AES.encrypt(passwordVal, 'secret key 123');
 	//var tester = ciphertext.toString(CryptoJS.enc.Utf8);
 	var tester = ciphertext.toString();
 	console.log('test2  ', tester);

 
	//console.log('Plaintext:', plaintext);
	console.log(req.body); 

	//var plainJson = {encrypted: plaintext};
	var plainJson = {encrypted: tester};
	console.log(plainJson); 
	//res.render('success', {data: req.body});
	res.render('success', {data: plainJson});
	
});

//second form submit action
app.post('/contact-two', urlencodedParser, function(req, res){
	console.log(req.body);

	passwordVal = req.body.invoice;
	invoiceVal = passwordVal.toString();
	// Decrypt
	var bytes  = CryptoJS.AES.decrypt(invoiceVal.toString(), 'secret key 123');
	var plaintext = bytes.toString(CryptoJS.enc.Utf8);
	var plaintexttwo = req.body.password;
	
	if (plaintext == plaintexttwo) {

	var plainJson = {encrypted: plaintext};
	console.log(plainJson); 
	//res.render('success', {data: req.body});
	res.render('success-two', {data: plainJson});
	}
	//res.render('success-two');
	
});

//app.get('/', function(req, res){
//	res.render('index');
//});

//hompage request response

 const server = http.createServer((req, res) => {
  res.statusCode = 200;

  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Wrld me\n');
});

//post response to accept user password entry
// and invoice request
	//encrypt users password with our secret
	//call back  output encrpted data


//post response to accept user password entry
// and invoice entry
		//decrypt users decrypt "invoice memo" 
		//with users password
		//call back sucess alert

//old code
//server.listen(port, hostname, () => {
//  console.log(`Server running at http://${hostname}:${port}/`);
//});

app.listen(3000, function(){
	console.log('Server running on port 3000')
})