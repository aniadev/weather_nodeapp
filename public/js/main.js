function getWeather(city) {
  //   city.tolowerCase();
  return new Promise((resolve, reject) => {
    const url = `./weather?city=${city}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getWeatherByPosition({ latitude, longitude }) {
  //   city.tolowerCase();
  return new Promise((resolve, reject) => {
    const url = `./weather?lat=${latitude}&lon=${longitude}`;
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function setLoading(state) {
  const onLoading = document.getElementById("w-loading");
  state
    ? (onLoading.style.visibility = "show")
    : (onLoading.style.visibility = "hidden");
}

function getToday() {
  const date = new Date();
  const dow = date.getDay();
  let dowString = "Sunday";
  switch (dow) {
    case 0:
      dowString = "Sunday";
      break;
    case 1:
      dowString = "Monday";
      break;
    case 2:
      dowString = "Tuesday";
      break;
    case 3:
      dowString = "Wednesday";
      break;
    case 4:
      dowString = "Thursday";
      break;
    case 5:
      dowString = "Friday";
      break;
    case 6:
      dowString = "Saturday";
      break;
  }
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${dowString}, ${day}/${month}/${year}`;
}

window.onload = async function () {
  // Querry selector
  const location = document.getElementById("w-location");
  const temperature = document.getElementById("w-temp");
  const weatherStatus = document.getElementById("w-status");
  const today = document.getElementById("w-today");
  const imgState = document.getElementById("w-img-state");
  const humidity = document.getElementById("w-humidity");
  const wind = document.getElementById("w-wind");
  const maxTemp = document.getElementById("w-max-temp");

  const position = {
    latitude: 21.0245,
    longitude: 105.8412,
  };

  setLoading(true);
  today.innerHTML = getToday();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((p) => {
      position.latitude = p.coords.latitude;
      position.longitude = p.coords.longitude;
      console.log(p);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }

  const result = await getWeatherByPosition(position);
  console.log(">>> / file: main.js / line 18 / result", result);
  if (result.success) {
    setLoading(false);
    let data = result.data;
    location.innerHTML = data.name;
    temperature.innerHTML = `${Math.round(data.main.temp - 273.0)}`;
    weatherStatus.innerHTML = data.weather[0].main;
    imgState.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    wind.innerHTML = `${((data.wind.speed * 1000) / 3600).toFixed(2)} km/h`;
    humidity.innerHTML = `${data.main.humidity} %`;
    maxTemp.innerHTML = `${Math.round(data.main.temp_max - 273.0).toFixed(1)}`;
  } else {
    setLoading(true);
  }
};
