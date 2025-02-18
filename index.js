async function getWeather() {
    // Get the city input element
    let city = document.getElementById("city-name");

    // API key for OpenWeatherMap
    const apiKey = "fa041bedebb1353748299e613f4dda63";

    try {
        // Construct URL to get geo-location (latitude and longitude) of the city
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city.value}&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        // Extract latitude and longitude from the response
        const lat = data[0].lat;
        const lon = data[0].lon;

        // Construct URL to get weather data using latitude and longitude
        const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const response2 = await fetch(url2);
        const data2 = await response2.json();

        // Display the weather results container
        document.getElementById("weather-results").style.display = "block";

        // Check if the city name matches the API response
        if (city.value == data2.name) {
            // Display the weather details
            document.getElementById("weather-results").innerHTML = `
                <p><strong>Weather in ${data2.name}</strong></p>
                <p>Temperature: ${(data2.main.temp - 273.15).toFixed(2)}°C</p>
                <p>Humidity: ${data2.main.humidity}%</p>
                <p>Weather: ${data2.weather[0].description}</p>
            `;
        } else {
            // Display an error message if the city is not found
            document.getElementById("weather-results").innerHTML = `
                <p><strong>${city.value} not Found!</strong></p>
            `;
        }
    } catch (error) {
        // Log an error message if fetching data fails
        console.error("Error fetching data ", error);
    }
}
