const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const uri = "https://api.darksky.net/forecast/46e136bad797b1ff8efdc3dc78642ef9/" + latitude + "," + longitude + "?units=si"
    request(
        {
            uri,
            json: true
        },
        (err, response, { error, daily, currently }) => {
            if (err) {
                callback("Unable to connect to Weather Service", undefined)
            } else if (error) {
                callback("Forecast: Invalid location. Please check your inputs.", undefined)
            } else {
                callback(undefined, {
                    summary: daily.data[0].summary,
                    temperature: currently.temperature,
                    precipProbability: currently.precipProbability,
                    windSpeed: currently.windSpeed,
                    forecast: daily.data[0].summary + " The temperature is " + currently.temperature + "'C with a " + currently.precipProbability + "% chance of rain. Wind speed is "+currently.windSpeed+" kmph."
                })
            }
        }
    )
}

module.exports = forecast