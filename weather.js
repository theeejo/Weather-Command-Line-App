// node app.js 90210
// node app.js Cleveland OH

// http://api.weatherapi.com/v1

const https = require('https');
const http = require('http');
const api = require('./api.json');

// Print Error Messages
function printError(error) {
  console.error(error.message);
}
// Function to print message to console
function printMessage(country, city, temp) {
  //   const message = `${country}: ${city} ${temp} Celsius degrees at the moment.`;
  const message = `Current weather in ${city}, ${country}: ${temp}C.`;
  console.log(message);
}

function get(query) {
  try {
    // Connect to the API URL (https://api.weatherapi.com/v1/current.json?key=796da7a063ff4f83aa8142003222903&q=query&aqi=no)
    const request = https.get(
      `https://api.weatherapi.com/v1/current.json?key=${api.key}&q=${query}&aqi=no`,
      (response) => {
        if (response.statusCode === 200) {
          let body = '';

          // Read the data
          response.on('data', (data) => {
            body += data.toString();
          });

          response.on('end', () => {
            try {
              // Parse the data
              const weather = JSON.parse(body);

              // Print the data
              printMessage(
                weather.location.country,
                weather.location.name,
                weather.current.temp_c
              );
            } catch (error) {
              printError(error);
            }
          });
        } else {
          const message = `There was an error getting the weather for ${query} (${
            http.STATUS_CODES[response.statusCode]
          })`;
          const statusCodeError = new Error(message);
          printError(statusCodeError);
        }
      }
    );
    request.on('error', printError);
  } catch (error) {
    printError(error);
  }
}

module.exports.get = get;

// log out the body of the response
