window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector('.temperature span');

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/b50afecabe1c1ae76d1596754754e819/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { temperature, summary, icon } = data.currently;
          // Set DOM Elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

            // Celsius Formula
            let celsius = (temperature - 32) * (5 / 9);
            // Set Icon
            setIcons(icon, document.querySelector('.icon'));
            // Change Temp to Celsius/Farhenait
            temperatureSection.addEventListener('click', () => {
              if(temperatureSpan.textContent === "F") {
                temperatureSpan.textContent = "C";
                temperatureDegree.textContent = Math.floor(celsius);
              } else {
                temperatureSpan.textContent = "F";
                temperatureDegree.textContent = temperature;
              }
            })
        })
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
