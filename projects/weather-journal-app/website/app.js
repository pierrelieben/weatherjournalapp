/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
// let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let newDate = d.toDateString();

// base API URL and API key with metric units attached
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const appid = "&appid=fdad557729cbd4b234bbaa147f8341f0&units=metric";
const hostname = "127.0.0.1";

// add a listener to the generate button which sets the entire process in motion
document.getElementById('generate').addEventListener('click', generateData);

// start data generation process which includes calling the api and updating the UI
function generateData(e) {
    const zip = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    getAPI(baseURL, zip, appid).then((data) => {
        console.log("The temp in " + (data.name) + " is " + (data.main.temp) + " deg Celsius" + (feeling));

        // pull data from api
        if (data) {
            const {
              main: { temp },
              name: city
            } = data;

            //add the feeling data to api data before posting to server
            const info = {
                newDate,
                city,
                temp: Math.round(temp),
                feeling
              };
            
            postData('/add', info);
        }
    }).then(function() {updateUI()});
};

// send a request to the weather API 
const getAPI = async (baseURL, zip, appid) => {
    const response = await fetch(baseURL+zip+appid);
    console.log(baseURL, zip, appid);
    try {
        const APIdata = await response.json();
        console.log('Data collected and stored as json!');
        return APIdata;
    } catch {
        console.log("error", error);
    }
}

// post the data to the node server, aimed at the post request route specified in server.js
const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

// update the UI
const updateUI = async () => {
    const res = await fetch('/all');
    try{
        const latestData = await res.json();
        console.log(latestData);
        const history = document.getElementById('historyTitle');
        const htmlText = `<div id = "entryHolder" class="flex flex-row text-[#D9ACAC] max-w-3xl">
                            <div id = "date" class="px-7 text-[#D9ACAC]">
                            ${latestData.date}, ${latestData.city}
                            </div> 
                            <div id = "temp" class="px-7">
                            ${latestData.temp} deg Celsius
                            </div>
                            <div id = "content" class="px-7">
                            ${latestData.feeling}
                            </div> 
                        </div>`;
        history.insertAdjacentHTML("afterend", htmlText);
    } catch (error) {
        console.log(projectData);
        console.log('Error updating UI');
    }
  }


//add dark mode functionality (I'm still working on this...)
// function darkMode() {
//     const root = document.getElementsByTagName('html')[0];
//     if (root.classList.contains('dark')) {
//         root.classList.remove('dark');
//         console.log('white enebled');
//         }
//     else {
//         root.classList.add('dark');
//         console.log('dark enabled');
//         }
// }
// const toggle = document.getElementById('dark-mode');
// toggle.addEventListener('click', darkMode);


