console.log('Client side JavaScript');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2')
const img = document.querySelector('#image');
const preci = document.querySelector('#precipitation');
const wind = document.querySelector('#wind');
const humidity = document.querySelector('#humidity');
const detail = document.querySelector('#heading');
const time = document.querySelector('#time');
const cloud = document.querySelector('#cloud');
const feel = document.querySelector('#feel');

const docBody = document.body;
const header = document.getElementById('header')

// docBody.style.backgroundSize = "cover";
// docBody.style.backgroundRepeat = "no-repeat"
// docBody.style.backgroundPosition = "center center"
const getData = (e) => {
    e.preventDefault()
    const location = search.value 
    // const location2 = search2.value;

    messageOne.textContent = 'Loading....';
    messageTwo.textContent = '';
    heading.textContent = 'Loading...'

    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
            
        
        if(data.error){
            // console.log(data.error);
            messageOne.textContent = data.error;
        }    
        else{
            let weather = data.forecast;
            messageOne.textContent = `${data.forecast.temp}`;

            let degree = document.createElement("span");
            degree.id = "color"
            degree.innerHTML = "°C"
            messageOne.appendChild(degree)
            messageOne.style.fontSize = "90px"
            messageTwo.textContent = data.location;
            img.src = data.forecast.pic;
            preci.textContent = `${data.forecast.precip}% Precipitation`;
            wind.textContent = `${data.forecast.wind_speed} km/hr Wind`;
            humidity.textContent = `${data.forecast.humidity}% Humidity`;
            heading.textContent = data.forecast.description;
            time.textContent = data.forecast.timeDate;
            cloud.textContent = `${data.forecast.cloudy}% Cloudy`;
            feel.textContent = `${data.forecast.feels}°C Feels Like`


            let weatherDescription = weather.description.toLowerCase();

            // let weatherDescription = "Light Rain";
            let isDay = data.forecast.dayNight;
            // let isDay = "no";
            // console.log(isDay)
            // console.log(weatherDescription)
            let description = weatherDescription.split(' ')
            console.log(description)
            let keyWords = ['Thunderstorm','Rain', 'Mist', 'with', 'Rain,', 'Mist,'];
            if(weatherDescription){
                    keyWords.filter(function (item) { 
                        console.log(description.includes(item));
                        docBody.style.backgroundImage = "url('../images_weather/rain-lightning.jpg')";
                        docBody.style.backgroundSize = "cover";
                    })
                
            }


            let rainKeyWords = ['Rain','Light', 'Mist', 'Shower', 'Drizzzle', 'Rain,', 'Mist,', 'Moderate Rain at times',]
            if(weatherDescription  && isDay == 'yes'){
                    rainKeyWords.filter(function (item) { 
                        docBody.style.background = "url('../images_weather/rain-day.jpg')"
                        docBody.style.backgroundSize = "cover";
                        console.log(description.includes(item));
                    })
            }
            if(weatherDescription  && isDay == 'no'){
                rainKeyWords.filter(function (item) { 
                    docBody.style.background = "url('../images_weather/rain-night.jpg')"
                    docBody.style.backgroundSize = "cover";
                    console.log(description.includes(item));
                })
            }


            let fogKeyWords = ["Fog", "Mist", "Fog,", "Mist," ]

        switch (weatherDescription + "|" + isDay) {
            case 'sunny|yes':
                docBody.style.backgroundImage = "url('../images_weather/sunny.jpg')";
                break;

            //CHANGING BGIMAGE FOR OVERCAST WEATHER
            case 'overcast|yes':
                docBody.style.backgroundImage = "url('../images_weather/overcast-day.jpg')";
                break;
            case 'overcast|no':
                docBody.style.backgroundImage = "url('../images_weather/overcast-night.jpg')";
                break; 

            //CHANGING BGIMAGE FOR CLEAR WEATHER
            case 'clear|yes':
                docBody.style.backgroundImage = "url('../images_weather/clear-day.jpg')";
                break;
            case 'clear|no':
                docBody.style.backgroundImage = "url('../images_weather/clear-night.jpg')";
                break; 

            //CHANGING BGIMAGE FOR PARTLY CLOUDY WEATHER      
            case 'partly cloudy|yes':
                docBody.style.backgroundImage = "url('../images_weather/partly-cloudy-day.jpg')";
                break;
            case 'partly cloudy|no':
                docBody.style.backgroundImage = "url('../images_weather/partly-cloudy-night.jpg')";
                break;

            //CHANGING BGIMAGE FOR FOGGY WEATHER    
            case 'fog|yes':
                docBody.style.backgroundImage = "url('../images_weather/fog-day.jpg')";
                break; 
            case 'fog|no':
                docBody.style.backgroundImage = "url('../images_weather/fog-night.jpg')";
                break;
            case 'haze|yes':
                docBody.style.backgroundImage = "url('../images_weather/fog-day.jpg')";
                break;
            case 'haze|no':
                docBody.style.backgroundImage = "url('../images_weather/fog-night.jpg')";
                break;  
            case 'fog, mist|yes': case 'mist|yes':
                docBody.style.backgroundImage = "url('../images_weather/fog-day.jpg')";
                break;  
            case 'fog, mist|no': case 'mist|no':
                docBody.style.backgroundImage = "url('../images_weather/fog-night.jpg')";
                break;

            //CHANGING BGIMAGE FOR CLOUDY WEATHER    
            case 'clouds|yes':
                docBody.style.backgroundImage = "url('../images_weather/cloudy-day.jpg')"; 
                break; 
            case 'clouds|no':
                docBody.style.backgroundImage = "url('../images_weather/cloudy-night.jpg')"; 
                break; 
                
            //CHANGING BGIMAGE FOR THUNDERSTORM WEATHER    
            case 'thunderstorm|yes': case 'thunderstorm|no':
                docBody.style.backgroundImage = "url('../images_weather/thunderstorm.jpg')";  
                break;

            //CHANGING BGIMAGE FOR SMOKE WEATHER    
            case 'smoke|yes':
                docBody.style.backgroundImage = "url('../images_weather/smoke-day.jpg')";
                break;
            case 'smoke|no':
                docBody.style.backgroundImage = "url('../images_weather/smoke-night.jpg')";
                break;
            //CHANGING BGIMAGE FOR SNOWY WEATHER    
            case 'snow|yes':
                docBody.style.backgroundImage = "url('../images_weather/snow-day.jpg')";
                break;
            case 'snow|no':
                docBody.style.backgroundImage = "url('../images_weather/snow-night.jpg')";
                break;
            case 'blizzard|yes':
                docBody.style.backgroundImage = "url('../images_weather/snow-day.jpg')";
                break;
            case 'blizzard|no':
                docBody.style.backgroundImage = "url('../images_weather/snow-night.jpg')";
                break;                    
            default:
                console.log('nothing matching found');
        }
    }
    });
});
}
weatherForm.addEventListener('submit', getData);



