// ⦁	Forecaster
// Write a program that requests a weather report from a server and displays it to the user.
// Use the skeleton from the provided resources.
// When the user writes the name of a location and clicks “Get Weather”, make a GET request to the server at address http://localhost:3030/jsonstore/forecaster/locations. The response will be an array of objects, with the following structure:
// { 
//   name: locationName,
//   code: locationCode
// }
// Find the object, corresponding to the name that the user submitted in the input field with ID "location" and use its code value to make two more GET requests:
// ⦁	For current conditions, make a request to:
// http://localhost:3030/jsonstore/forecaster/today/:code
// The response from the server will be an object with the following structure:
// { 
//   name: locationName,
//   forecast: { low: temp,
//               high: temp,
//               condition: condition } 
// }
// ⦁	For a 3-day forecast, make a request to: 
// http://localhost:3030/jsonstore/forecaster/upcoming/:code
// The response from the server will be an object with the following structure:
// { 
//   name: locationName,
//   forecast: [{ low: temp,
//                high: temp,
//                condition: condition }, … ] 
// }
// Use the information from these two objects to compose a forecast in HTML and insert it inside the page. Note that the <div> with ID "forecast" must be set to visible. See the examples for details. 
// If an error occurs (the server doesn’t respond or the location name cannot be found) or the data is not in the correct format, display "Error" in the forecast section.
// Use the following codes for weather symbols:
// ⦁	Sunny			&#x2600; // ☀
// ⦁	Partly sunny	             &#x26C5; // ⛅
// ⦁	Overcast		&#x2601; // ☁
// ⦁	Rain			&#x2614; // ☂
// ⦁	Degrees		&#176;   // °
// Examples
// When the app starts, the forecast div is hidden. When the user enters a name and clicks on the button Get Weather, the requests being.


async function attachEvents() {
    const inputRef = document.getElementById('location');
    const url = `http://localhost:3030/jsonstore/forecaster/locations/`;
    const current = document.getElementById('current');
    const upcoming = document.getElementById('upcoming');

    document.getElementById('submit').addEventListener('click', getDetails);

    async function getDetails() {
        try {
            const inputValue = inputRef.value;
            const request = await fetch(url);
            const data = await request.json();

            const x = data.find(el => el.name == inputValue);

            forecastToday(x.code);
            forecastUpcoming(x.code);

            document.getElementById('forecast').style.display = 'block';
        } catch (error) {
            document.getElementById('forecast').style.display = 'block';
            document.getElementById('forecast').textContent = 'Error';

        }
    }
    async function forecastToday(code) {
        const url = `http://localhost:3030/jsonstore/forecaster/today/${code}`;

        const response = await fetch(url);
        const data = await response.json();

        const divForecasts = c('div', '', 'forecasts');
        const spanSymbol = c('span', symbol(data.forecast.condition), 'condition symbol');
        const spanCondition = c('span', '', 'condition');

        const spanLocation = c('span', `${data.name}`, 'forecast-data');
        const spanDegrees = c('span', `${data.forecast.low}\u00B0/${data.forecast.high}\u00B0`, 'forecast-data');
        const spanWeather = c('span', `${data.forecast.condition}`, 'forecast-data');

        spanCondition.appendChild(spanLocation);
        spanCondition.appendChild(spanDegrees);
        spanCondition.appendChild(spanWeather);

        divForecasts.appendChild(spanSymbol);
        divForecasts.appendChild(spanCondition);
        current.appendChild(divForecasts);
    }

    async function forecastUpcoming(code) {
        const url = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;

        const response = await fetch(url);
        const data = await response.json();

        const [day1, day2, day3] = data.forecast;

        const divForecastInfo = c('div', '', 'forecast-info');

        divForecastInfo.appendChild(generateUpcoming(day1, 'upcoming'));
        divForecastInfo.appendChild(generateUpcoming(day2, 'upcoming'));
        divForecastInfo.appendChild(generateUpcoming(day3, 'upcoming'));
        upcoming.appendChild(divForecastInfo);
    }

    function generateUpcoming(data, classes) {

        const spanUpcoming = c('span', '', classes);

        const spanSymbol = c('span', symbol(data.condition), 'symbol');

        const spanDegrees = c('span', `${data.low}&#176/${data.high}&#176`, 'forecast-data');
        const spanWeather = c('span', `${data.condition}`, 'forecast-data');

        spanUpcoming.appendChild(spanSymbol);
        spanUpcoming.appendChild(spanDegrees);
        spanUpcoming.appendChild(spanWeather);

        return spanUpcoming;
    }

    function symbol(string) {
        switch (string) {
            case 'Sunny': return '&#x2600'; // ☀
            case 'Partly sunny': return '&#x26C5'; // ⛅
            case 'Overcast': return '&#x2601'; // ☁
            case 'Rain': return '&#x2614'; // ☔
        }
    }

    function c(type, content, className) {
        const element = document.createElement(type);
        element.innerHTML = content;
        if (className) {
            element.className = className;
        }
        return element;
    }
}

attachEvents();