const request = require('request')

const geocode = (address, callback) => {
    const uri = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoicGhhbnRvbXNnIiwiYSI6ImNqdzJ6ZjI2azB6MTI0OXBzaW1kYmgxcHMifQ.9YJDs0DSdGN7BI8JStjnZA&limit=1"
    request(
        {
            uri,
            json: true
        },
        (err, response, {features}={}) => {
            if (err) {
                callback("Unable to connect to Geocoder", undefined)
            } else if (features.length === 0) {
                callback("Geocode: Invalid location. Please check your inputs.", undefined)
            } else {
                callback(undefined, {
                    latitude: features[0].center[1],
                    longitude: features[0].center[0],
                    location: features[0].place_name
                })
            }
        }
    )
}

module.exports = geocode