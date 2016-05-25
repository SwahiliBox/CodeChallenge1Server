
##SwahiliBox Mobile App

An app for [SwahiliBox](swahilibox.co.ke) that will ensure community members have info on any meetings events and new info available to them on their phones at the same time members to be able to RSVP for events and meetings from their phones

### Prerequisities

* Node.js
* Express.js
* MongoDB (mongoose)
* Cordova for Intel XDK
* Intel XDK



### Installing

A step by step series of examples that tell you have to get a development env running for Linux

To get your local copy git clone `https://github.com/SwahiliBox/CodeChallenge1Server.git`

*cd* into the project root and run ```npm install```

example server.js code
```
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
```

`Output:Server is Running at ::: on port 3000`




### Contributing

Please read `CONTRIBUTING.md` for details on our code of conduct, and the process for submitting pull requests to us.

See also the list of contributors who participated in this project.


This project is licensed under the ***MIT license***.
