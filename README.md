##SwahiliBox Mobile App

An app for [SwahiliBox](swahilibox.co.ke) that will ensure community members have info on any meetings events and new info available to them on their phones at the same time members to be able to RSVP for events and meetings on their mobile phones
It will also allow SwahiliBox to keep tabs on the numbers attending these meetings and events while at the same time enable them to keep their members well updated on any issues arising 

### Prerequisities

* Node.js
* Express.js
* MongoDB (mongoose)
* Cordova for Intel XDK
* Intel XDK
* Text Editor

### Installing

A step by step series of examples that tell you how to get a development env running for Linux

To get your local copy git clone `https://github.com/SwahiliBox/CodeChallenge1Server.git`

Make sure you have ruby installed. The project's css files are written in sass and have to 
be compiled into css, If you don't want to go through all the process of installing Ruby you
can just install ruby-sass by typing `sudo apt-get install ruby-sass`

*cd* into the project root and run ```npm run dev```

example server.js code
```javascript 
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

`Output:production server Running on localhost: port 3000`

### Deploying to heroku.

After you have created you app on heroku, make sure you add config vars MONGOLAB_URI with value matching
your real mongolab database credentials, the value shoud be in the following format 

`"mongodb://<yourusername>:<yourpasswor><@urltomongolabdatabase>:<port#>/<databasename>"`

Then rename the .env.sample file to .env and edit the value of the MONGOLAB_URI  to match
the one you have set on heroku

Now you will be able to just deploy your code by just typing the command

```git push heroku master``` 

Assuming that you followed the instructions on heroku on how to link your heroku app repository to your
project

If you get any error, use the heroku logs command to see what error you're getting and fix it
`heroku logs -a 'name_of_your_app' -t

NOTE: the -t flag is for tail, meaning it will keep on display the logs as things happen within your 
heroku app.

### Contributing

We welcome everyone to contribute to our projects and help us tackle existing issues! To do so, there are a few things you need to know about the code. First, our code is divided in an MVC like structure, all available inside the app folder:

`app/models - Contains all our application and business logic`

`app/controllers - Contains everything that happens when requests come in and get dispatched`

This application is a volunteer effort. We encourage you to pitch in and join the team!

This project is licensed under the **_MIT license._**

Thanks
