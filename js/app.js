const API_KEY = "b2baebb0551c49bd845160356233003";
const btnSearch = document.getElementById("btn-search");
const searchBox = document.getElementById("search-box");
const weatherContainer = document.querySelector("#weather-container");
const body = document.querySelector("body");

//getWeather() obtiene la informacion de la api y la muestra en el HTML. 
//Luego de mostrar la informacion, se limpia el contenido del contenedor. 
const getWeather = async (city) => {
  try {
    const URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&lang=es&q=${city}&aqi=no`;
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Ocurrio un problema: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error(error);
  }
}

btnSearch.addEventListener("click", async () => {
  try {
    const city = searchBox.value;
    const weatherData = await getWeather(city);
    searchBox.value = "";
    displayWeather(weatherData);
    changeBackground(weatherData);
  } catch (error) {
    console.error(error);
  }
});

//Evento keypress en el input searchBox para ejecutar la busqueda cuando se presiona la tecla Enter.
//verifica que la tecla presionada sea la tecla Enter. Luego, se obtiene el valor del input searchBox.
searchBox.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    try {
      const city = searchBox.value;
      const weatherData = await getWeather(city);
      searchBox.value = "";
      displayWeather(weatherData);
      changeBackground(weatherData);
    } catch (error) {
      console.error(error);
    }
  }
})

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
  location.classList.add("location");
  location.textContent = `${weatherData.location.name}, ${weatherData.location.country}`;
  weatherInfo.appendChild(location);

  const temp = document.createElement('p')
  temp.textContent = `Temperatura ${weatherData.current.temp_c}°C`;
  weatherInfo.appendChild(temp);

  const feelsLike = document.createElement('p');
  feelsLike.textContent = `Sensacion Termica ${weatherData.current.feelslike_c}°C`;
  weatherInfo.appendChild(feelsLike);

  const humidity = document.createElement('p')
  humidity.textContent = `Humedad ${weatherData.current.humidity}%`;
  weatherInfo.appendChild(humidity);

  const wind = document.createElement('p')
  wind.textContent = `Viento ${weatherData.current.wind_kph} km/h`;
  weatherInfo.appendChild(wind);

  const condition = document.createElement('p')
  condition.textContent = `Condicion ${weatherData.current.condition.text}`;
  weatherInfo.appendChild(condition);

  const icon = document.createElement('img')
  icon.src = `https:${weatherData.current.condition.icon}`;
  weatherInfo.appendChild(icon);

  weatherContainer.innerHTML = ""
  weatherContainer.appendChild(weatherInfo);
}

//funcion para cambiar el fondo de la pagina dependiendo de la temperatura del clima.
const changeBackground = (weatherData) => {
  const temp = weatherData.current.temp_c;

  // Define una función para establecer el color de fondo con una transición
  const setTransitionBackground = (color) => {
    body.style.transition = "background-color 0.6s ease";
    body.style.backgroundColor = color;
  };

  // Cambia el color de fondo según la temperatura
  if (temp > 30) {
    setTransitionBackground("#B70404");
  } else if (temp > 20) {
    setTransitionBackground("#FC6736");
  } else {
    setTransitionBackground("#40A2E3");
  }

  // Limpia la transición después de un tiempo para evitar que afecte otros cambios
  setTimeout(() => {
    body.style.transition = "";
  }, 500);
}

