const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const image = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = (data) => {

    const { cityDetails, weather} = data;

    //update details template

    details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
    </div>
    `;

    //update night/day image
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;

    icon.setAttribute('src', iconSrc);

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    image.setAttribute('src', timeSrc);


    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
};


cityForm.addEventListener('submit', e => {
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //set local storage
    localStorage.setItem('location', city);

    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});


if(localStorage.getItem('location')) {
    forecast.updateCity(localStorage.getItem('location'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
};