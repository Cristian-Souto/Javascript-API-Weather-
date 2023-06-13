const API_KEY = "b2baebb0551c49bd845160356233003";
const btnSearch = document.getElementById("btn-search");
const searchBox = document.getElementById("search-box");
const weatherContainer = document.querySelector("#weather-container");

const getWeather = async (city) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&lang=es&&q="${city}"&aqi=no`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

btnSearch.addEventListener("click", async () => {
  const city = searchBox.value;
  const weatherData = await getWeather(city);
  searchBox.value = "";
  displayWeather(weatherData);
});

/*
Se define un elemento html con el ID weather-container donde se mostrara
la info del clima. Luego se define la función displayWeather() que recibe
el objeto weatherData que contiene la información del clima.
dentro de la funcion displayweather(), se crean dinamicamente utilizando 
document.createElement(). Se crea un div con la clase weather-info para
contener toda la información del clima y se le agregan elementos h2 y p
para mostrar la temperatura y la humedad etc.
luego se limpia el contenido del contenedor weatherContainer utilizando
innerHTML y se agrega el div con la informacion del clima al contenedor.
appendChild()

en el evento click, se obtiene el valor del input searchBox, se llama
a la funcion getWeather() con ese valor como parametro y se almacena
los datos de la respuesta en la variable weatherData.
Finalmente, se llama a la funcion displayWeather() con weatherData
como parametro para mostrar los datos en el HTML.

*/
const displayWeather = (weatherData) => {
  //creamos un div para mostrar la info de la api
  const weatherInfo = document.createElement("div");
  weatherInfo.classList.add("weather-info");

  const location = document.createElement('h2')
  location.textContent = `${weatherData.location.name}, ${weatherData.location.country}`;
  weatherInfo.appendChild(location);

  const temp = document.createElement('p')
  temp.textContent = `Temperatura: ${weatherData.current.temp_c}°C`;
  weatherInfo.appendChild(temp);

  const humidity = document.createElement('p')
  humidity.textContent = `Humedad: ${weatherData.current.humidity}%`;
  weatherInfo.appendChild(humidity);

  const wind = document.createElement('p')
  wind.textContent = `Viento: ${weatherData.current.wind_kph} km/h`;
  weatherInfo.appendChild(wind);

  const condition = document.createElement('p')
  condition.textContent = `Condicion: ${weatherData.current.condition.text}`;
  weatherInfo.appendChild(condition);

  const icon = document.createElement('img')
  icon.src = `${weatherData.current.condition.icon}`;
  weatherInfo.appendChild(icon);


  weatherContainer.innerHTML = ""
  weatherContainer.appendChild(weatherInfo);
}