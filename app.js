const weather = require('./weather.js');

const weathers = process.argv.slice(2);
weathers.forEach(weather.get);
