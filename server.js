// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;

//function to tell us that the server is running in a specific port
const listening_server_port = () => {
	console.log(`server is running on localhost: ${port}`);
};

//running the server
const server = app.listen(port, listening_server_port);


//get end-point
//get route
const get_data = (req, res) => {
	res.send(projectData);
};
app.get('/getData', get_data);


//post route
const post_data = (req, res) => {
	console.log(req.body);
	const data = req.body;
	newEntry = {
		date: data.date,
		temp: data.temp,
		content: data.content
	};

  projectData.push(newEntry);
  console.log(projectData);

};
app.post('/postData', post_data);