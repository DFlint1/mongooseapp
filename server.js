
// Dependencies
var express = require("express");
var mongoose = require("mongoose");
// Initialize Express
var app = express();

var bodyParser = require("body-parser");
var logger = require("morgan");

// Our scraping tools
// var request = require("request");
// var cheerio = require("cheerio");
// Requiring our Note and Article models


// Set up our port to be either the host's designated port, or 3000
var PORT = process.env.PORT || 3000;
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;



// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
// Set up an Express Router
var router = express.Router();

// Require our routes file pass our router object
require("./config/routes")(router);
// var routes = require("./public/assets/js/app.js");
// app.use("/", routes);



// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// 
// Designate our public folder as a static directory
app.use(express.static(__dirname + "/public"));

// Have every request go through our router middleware
app.use(router);

// Database configuration with mongoose
mongoose.connect
('mongodb://heroku_7r68s1pw:2i8gl2ura1g3sed9dannv1fnsn@ds137220.mlab.com:37220/heroku_7r68s1pw');
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// 
// Connect mongoose to our database
mongoose.connect(db, function(error) {
  // Log any errors connecting with mongoose
  if (error) {
    console.log(error);
  }
  // Or log a success message
  else {
    console.log("mongoose connection is successful");
  }
});

// Listen on the port
app.listen(PORT, function() {
  console.log("Listening on port:" + PORT);
});

