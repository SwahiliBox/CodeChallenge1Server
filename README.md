
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

We welcome everyone to contribute to our projects and help us tackle existing issues! To do so, there are a few things you need to know about the code. First, our code is divided in an MVC like structure, all available inside the app folder:

`app/models - Contains all our application and business logic`

`app/controllers - Contains everything that happens when requests come in and get dispatched`

This application is a volunteer effort. We encourage you to pitch in and join the team!

This project is licensed under the **_MIT license._**

Thanks
