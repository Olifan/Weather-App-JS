const content = document.querySelector('.content');
const form = document.querySelector('#searchForm');
const input = document.querySelector('input');
const message = document.querySelector('.message');
const apikey = "4d8fb5b93d4af21d66a2948710284366";

const cities = [];

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputVal = input.value;

  function addCity() {
    cities.push(inputVal.toLowerCase());
    console.log(cities);
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apikey}&units=metric`;

  fetch(url).then((response) => { 
      return response.json()
    })
    .then(data => {
    console.log(data);
    const { main, name, sys, weather } = data;
    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

    if(inputVal === ""){
      message.textContent = "Please search for a valid city 😩";
    } else if(cities.includes(inputVal.toLowerCase())) {
      message.textContent = `You already know the weather for ${inputVal}
       ...otherwise be more specific by providing the country code as well 😉`;
    } else {
      message.textContent = "";
      addCity(); 

      const card = document.createElement('div');
      card.className = 'cards';
      card.innerHTML = `
        <div class="city">
            <span>${name}</span>
            <sup>${sys.country}</sup>
        </div>
        <div class="temp">
            ${Math.round(main.temp)}<sup>°C</sup>
        </div>
        <div class="weather">
            <img class="icon" src=${icon}>
            <span>${weather[0]["description"]}</span>
        </div>`;
      
        content.appendChild(card);
    }
  }).catch(() => {
    message.textContent = "Please search for a valid city 😩";
  });

  form.reset();
});


