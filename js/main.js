const apiKeyWeather = "3cd164f4f97ef8a1ca37e750777d6117";
const point ="https://api.openweathermap.org/data/2.5/weather"; //versión free

const imageMap = {
    Thunderstorm: "https://plus.unsplash.com/premium_photo-1664304434345-8b8e6b512532?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1202&q=80",
    Drizzle: "https://images.unsplash.com/photo-1520914419071-8ee104c68d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    Rain: "https://images.unsplash.com/photo-1518803194621-27188ba362c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80",
    Snow: "https://images.unsplash.com/photo-1517299321609-52687d1bc55a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    Mist: "https://images.unsplash.com/photo-1603794052293-650dbdeef72c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80",
    Smoke: "https://images.unsplash.com/photo-1603794052293-650dbdeef72c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80",
    Haze: "https://images.unsplash.com/photo-1423209086112-cf2c8acd502f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    Dust: "https://images.unsplash.com/photo-1593076436092-6f54229aca1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    Fog: "https://images.unsplash.com/photo-1486184885347-1464b5f10296?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1168&q=80",
    Sand: "https://images.unsplash.com/photo-1543604502-9baac28067ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    Ash: "https://images.unsplash.com/photo-1556660418-fc293a5d848d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    Squall: "https://images.unsplash.com/photo-1561705688-d7a84d853ba3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    Tornado: "https://images.unsplash.com/photo-1475181624534-3e2ff2beb57c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    Clear: "https://images.unsplash.com/photo-1523913950023-c47b5ae5b164?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    Clouds: "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
};

const searchButton = document.getElementById('search');
const inputCity = document.getElementById('cities');
const searchResult = document.getElementById('result');

const lastResult = getLastResultFromStorage();

searchButton.addEventListener("click", ()=>{
    const city  = inputCity.value;
    console.log("City:", city);
    weatherCitySearch(city);
});

if (lastResult) {
    setCurrentLocation(getLastResultFromStorage());
}

function weatherCitySearch(city){
    fetch(`${point}?q=${city}&APPID=${apiKeyWeather}&units=metric&lang=es`) // units=metric:para traer la temperatura en Celsius y lang=es para setear el idioma.
    .then(resp =>{
        return resp.json(); // retorno al siguiente then el response como json
    })
    .then(json => {
        console.log('resp del JSON del clima:', json); // Con esta info puedo ver contenido del JSON en consola
        let iconURL = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;

        setCurrentLocation(json);
    })
    .then(()=> {
        console.log('terminé:)');
    })
    .catch(error=>{
        console.log("Upps!! Algo salió mal :(", error);
    });
}

function setCurrentLocation(json) {
    let iconURL = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
    renderHTML(json, iconURL);

    console.log(json.weather[0].main);
    changeBackground(imageMap[json.weather[0].main]);

    saveLastResultInStorage(json);
}

function renderHTML(data, icono){
    let html;
    html=`
   
    <div>
        <h2 class="city">${data.name}, ${data.sys.country}</h2>
        <div class="temp-main-data">
          <span class="temp-big"> ${data.main.temp_max} °C</span>
            <img class="col-12" src="${icono}" alt=${data.weather[0].description}/>
        </div>
    </div>
    <div>
        <ul>
            <li>Temperatura máxima:<span> ${data.main.temp}</span> °C</li>
            <li>Temperatura mínima:<span> ${data.main.temp_min}</span> °C</li>
            <li>Humedad:<span> ${data.main.humidity}</span> %</li>
            <li>Sensación Térmica:<span> ${data.main.feels_like}</span> °C</li>
            <li>Presión atmosférica:<span> ${data.main.pressure}</span> hPa </li>
            <li>Velocidad del viento:<span> ${data.wind.speed}</span> m/s </li>
            <li>Ubicación:
            <iframe
                style="display: block; width: 100%;"
                src="https://maps.google.com/maps?q=${data.coord.lat},${data.coord.lon}&hl=es;z=14&amp;output=embed"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
            </li>
        </ul>
    </div>
    `
    result.innerHTML=html;
}


function changeBackground(imageUrl) {
    document.body.style.backgroundImage = `url(${imageUrl})`;
}

function saveLastResultInStorage(result) {
    localStorage.setItem("lastResult", JSON.stringify(result));
}

function getLastResultFromStorage() {
    const lastResult = JSON.parse(localStorage.getItem("lastResult"));
    return lastResult;
}




