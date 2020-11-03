/* Global Variables */
//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=5f496877048ee134e35791e6edea241b';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/////////////
//arrow method to fetch weather status fro api
const get_weather_status = async (baseURL, zip_code, key) => {

  const res = await fetch(baseURL+zip_code+key);
  try {
    const data = await res.json();
    return data;
  }
  catch(error) {
    //handle the error
    console.log("error", error);
  }
};


/* Function to POST data */
const postData = async ( url = '', data = {})=>{
  console.log(data);
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    }
    catch(error) {
      console.log("error", error);
    }
};

//arrow method to dynamically update UI
const updateUI = async () => {
  const request = await fetch('/getData');
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData[0].date;
    document.getElementById('temp').innerHTML = allData[0].temp;
    document.getElementById('content').innerHTML = allData[0].content;

  }
  catch(error){
    console.log("error", error);
  }
};
//////////////

//add eventlistener on click submit button
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
	const zip_code =  document.getElementById('zip').value;
	const user_feelings = document.getElementById('feelings').value;
	get_weather_status(baseURL,zip_code, apiKey)

  	.then(function(data) {
      console.log(data);
  		postData('/postData', {date:newDate, temp:data.weather[0].main.temp, content:user_feelings})
      updateUI();
  	})
};



