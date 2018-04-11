const axios = require('axios');
const YQL = require('YQL');

fetchWeather = function(woeIDs, callback) {
  var CSV_string = '2459115,2442047,2379574,2388929,2424766,2514815,2450022,2471217,2357024,2367105,2471390,2487956,2482250,2391585,2490383,2452078,2487889,2503863,2391279,2358820,2486982,2378426,2466256,2487796,2487796,2473224,2486340,2436704,2380358,2430683,2357536,2383660,2381475,2427032,2488042,2457170,2512636,2477058,2451822,2428344';

  var query = new YQL(`SELECT * FROM weather.forecast where woeid in(${CSV_string})`)
  query.exec((err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
}

exports.fetchWeather = fetchWeather;

// API DOCUMENTATION LINKS:
// https://gist.github.com/ydn/6ef5a695e871b8a628d0#file-weather-js
// https://developer.yahoo.com/weather/