const request = require('request')

const geoCode = (address, callback) => {
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/' ${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZ29waWpoYW1hdCIsImEiOiJjazh6M29kcGUwM2ZzM2VwZTJ5OTdocW41In0.ynZZU3kmtpHmvfkpe8pE3w&limit=1`;
    
    request( {url: geoUrl, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connnect to geolocation service!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location coordinates!', undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name,
            });
        }
        // console.log(body);
        // console.log(location);
    });
}


module.exports = geoCode;