const form = document.getElementById('new-city')
const input = document.getElementById('city-value')
let list = document.getElementById('cities-list')

form.addEventListener('submit', function(e) {
    e.preventDefault()
    let city = input.value
    
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?q=${city}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const info = {
                name: data.name,
                temp: data.main.temp,
                description: data.weather[0].description,
                tempMin: data.main.temp_min,
                tempMax: data.main.temp_max,
                wind: data.wind.speed,
                humidity: data.main.humidity,
                weather: data.weather[0].icon
            }
        
            list.innerHTML += `
                <div class='city'>
                    <h3>${info.name} - ${info.temp}°C</h3>
                    <p>${info.description}</p>
                    <img src='https://openweathermap.org/img/wn/${info.weather}@2x.png'/>
                    <ul>
                        <li>Maximum Temperature: ${info.tempMax}°C</li>
                        <li>Minimum Temperature: ${info.tempMin}°C</li>
                        <li>Wind Speed: ${info.wind}m/s</li>
                        <li>Humidity: ${info.humidity}%</li>
                    </ul>
                </div>
            `
        
            form.reset()
    })
    .catch(error => console.log(error))
})