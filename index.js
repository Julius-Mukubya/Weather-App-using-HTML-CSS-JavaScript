async function getWeather(){

    let city = document.getElementById("city-name");

    const apiKey = "fa041bedebb1353748299e613f4dda63";
    
    try{

        // url for getting geo location (lon, lat)
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city.value}&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
    
        const lat = data[0].lat;
        const lon = data[0].lon;

        // url for getting weather data
        const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const response2 = await fetch(url2);
        const data2 = await response2.json();
        
        document.getElementById("weather-results").style.display = "block";
        if (city.value == data2.name){       
            document.getElementById("weather-results").innerHTML =`
                <p><strong>Weather in ${data2.name}</strong></p>
                <p>Temperature: ${data2.main.temp}°C</p>
                <p>Humidity: ${data2.main.humidity}%</p>
                <p>Weather: ${data2.weather[0].description}</p>
            `;
        }else{
            document.getElementById("weather-results").innerHTML = `
                <p><strong>${city.value} not Found!</strong></p>
            `  
        }
       
    
    }
    catch (error){
        console.error("Error fetching data ", error);
    }
   
    
}