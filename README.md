
SwahiliBox Mobile App

 Is app for SwahiliBox that will ensure community members have info on any meetings events and new info available to them on their phones at the same time members to be able to RSVP for events and meetings from their Phones

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Prerequisities

1.Node.js
2.Express.js
3.MongoDB (mongoose)
4.Either Intel XDK or Android Studio
5.Cordova for Intel XDK
6.npm

Examples 

Installing

A step by step series of examples that tell you have to get a development env running for Linux
$ sudo apt-get install nodejs
$ sudo apt-get install npm
$ npm install express.js --save
$ npm install socket.io --save
$ npm install cors --save
$ npm install mongoose --save

Demo of server.js code
var express = require("express");

var app = express();

app.get("/", function  (req, res) {
	// body...Print out
	res.send("Hello Everyone");
});

var server = app.listen(3000, function  () {
	// body...
	var host = server.address().address;
	var port = server.address().port;

	console.log("Server is Running at :%s on port %s", host , port);
});

Output:Server is Running at ::: on port 3000




Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

See also the list of contributors who participated in this project.

License

This project is licensed under 

