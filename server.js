var express = require("express");

var port = process.env.PORT || 3000;

var eventController = require("./controllers/events");

var app = express();

var router = express.Router();

app.use("/api", router);

//Routes 

router.route("/events").get(eventController.getEvents);

router.route("/event").get(eventController.getEvent);

router.route("/addEvent").post(eventController.addEvent);

router.route("/updateEvent").post(eventController.updateEvent);

router.route("/delete").get(eventController.deleteEvent);


app.listen(port, function(){
  console.log("Server running on port: " + port);
};