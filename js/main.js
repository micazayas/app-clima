const apiKeyWeather = "3cd164f4f97ef8a1ca37e750777d6117";
const point ="https://api.openweathermap.org/data/2.5/weather"; //versión free

const searchButton = document.getElementById('search');
const inputCity = document.getElementById('cities');
const searchResult = document.getElementById('result');

searchButton.addEventListener("click", ()=>{
    const city  = inputCity.value;
    console.log("City:", city);
    weatherCitySearch(city);
});

function weatherCitySearch(city){
    fetch(`${point}?q=${city}&APPID=${apiKeyWeather}&units=metric&lang=es`) // units=metric:para traer la temperatura en Celsius y lang=es para setear el idioma.
    .then(resp =>{
        return resp.json(); // retorno al siguiente then el response como json
    })
    .then(json => {
        console.log('resp del JSON del clima:', json); // Con esta info puedo ver contenido del JSON en consola
        let iconURL = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
        renderHTML(json,iconURL);
    })
    .then(()=> {
        console.log('terminé:)');
    })
    .catch(error=>{
        console.log("Upps!! Algo salió mal :(", error);
    });
}

function renderHTML(datos, icono){
    let html;
    html=`
   
    <div>
        <h2 class="city">${datos.name}, ${datos.sys.country}</h2>
        <div class="temp-main-data">
          <span class="temp-big"> ${datos.main.temp_max} °C</span>
            <img class="col-12" src="${icono}" alt=${datos.weather[0].description}/>
        </div>
    </div>
    <div>
        <ul>
            <li>Temperatura máxima:<span> ${datos.main.temp}</span> °C</li>
            <li>Temperatura mínima:<span> ${datos.main.temp_min}</span> °C</li>
            <li>Humedad:<span> ${datos.main.humidity}</span> %</li>
            <li>Sensación Térmica:<span> ${datos.main.feels_like}</span> °C</li>
            <li>Presión atmosférica:<span> ${datos.main.pressure}</span> hPa </li>
            <li>Velocidad del viento:<span> ${datos.wind.speed}</span> m/s </li>
        </ul>
    </div>
    `
    result.innerHTML=html;
}






