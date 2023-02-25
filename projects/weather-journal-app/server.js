// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
const path = require('path');
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.set('website', path.join(__dirname, 'website'))
app.use(express.static('website'));

// Setup Server
const port = 8000;
const hostname = "127.0.0.1";
app.listen(port, listening);

function listening() {
    console.log(`Server is live and running on http://${hostname}:${port}/`, listening);
};

// Callback function to complete POST '/add'
const postData = (req, res) => {
    console.log(req.body);
    projectData.date = req.body.date;
    projectData.city = req.body.city;
    projectData.temp = req.body.temp;
    projectData.feeling = req.body.feeling;
    res.send(projectData);
  }
// POST Route
app.post("/add", postData);

// GET Route
app.get('/all', (req, res) => {
    res.send(projectData);
} )








// const appData = {Name:'Pierre'};
// Respond with JS object when a GET request is made to the homepage
// app.get('/all', function (req, res) {
//   res.send(appData.Name);
//   console.log(req);
// })

// const data = [];
// app.post('/add', add);
// function add (req, res){
//     console.log(req.body);
//     console.log("We got it thanks.");
//     data.push(req.body);
//     // res.send("We got it thanks.")
//     console.log(data);
//  }