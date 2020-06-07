/* Global Variables */
const key = 'b102c647162b25869a19bc8dc30fbb25';
let zipCode = '';
const url = 'http://api.openweathermap.org/data/2.5/weather?';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


// GET async function
const getData = async (url = '') => {
    const response = await fetch(url);

    try {
        const newData = await response.json();
        return newData;
    } catch (e) {
        console.log(e);
    }
}


// POST async function
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (e) {
        console.log(e);
    }
}


// updateUI function
const updateUI = async () => {
    const newData = await getData('/data')
    document.querySelector('#date').innerHTML = newData.date;
    document.querySelector('#temp').innerHTML = newData.temperature;
    document.querySelector('#content').innerHTML = newData.userResponse;
}


// add Event listener for button click
document.querySelector('#generate').addEventListener('click', getWetherHandler);


// callback function for the button click event
function getWetherHandler() {
    zipCode = document.querySelector('#zip').value

    const userResponse = document.querySelector('#feelings').value;
    getData(`${url}zip=${zipCode}&appid=${key}`)
        .then((newData) => {
            postData('/data', {
                temperature: newData.main.temp,
                date: newDate,
                userResponse: userResponse
            })

            // updateUI
            updateUI();
        });
}