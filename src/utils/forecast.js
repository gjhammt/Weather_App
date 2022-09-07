const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=35c8afdebf3ebb93ebba0cf60621ae45&query=${latitude},${longitude}&units=m`;

    request( {url, json:true}, (error, { body }) => {
        if (error) {
            callback('Unable to connnect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location!', undefined);
        } else {
            const description = body.current.weather_descriptions[0];
            const temp = body.current.temperature;
            const feels = body.current.feelslike;
            const wind_speed = body.current.wind_speed;
            const humidity = body.current.humidity;
            const pic = body.current.weather_icons[0];
            const precip = body.current.precip;
            const timeDate = body.location.localtime;
            const cloudy = body.current.cloudcover;
            const dayNight = body.current.is_day;
            const jsonData = {
                description , temp, feels, wind_speed, humidity, pic, precip, timeDate, cloudy, dayNight
            }
            callback(undefined, jsonData)
            // callback(undefined, `${description}. It is currently ${temp}°C. It feels like ${feels}°C out. The wind speed is ${wind_speed}km/hr and humidity is ${humidity}%`);
            console.log(body.current);
            console.log(jsonData);
            // console.log(pic)
            // console.log(typeof(pic))
        }
    });
}

module.exports = forecast;