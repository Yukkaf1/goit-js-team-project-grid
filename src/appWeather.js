import './sass/_weatherBlock.scss'
import './sass/_weatherForecast.scss'
// import _debounce from 'lodash.debounce';

// const DEBOUNCE_DELAY = 100;
// const STORAGE_LAT = 'geo-current-lat';
// const STORAGE_LON = 'geo-current-lon';

import moment from 'moment';
import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const URL2 = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = 'be0f81a8f9f4c462088b51501fa506a7'

const weatherEl = document.querySelector('#root'); 

day =  moment(new Date()).format('ddd')
date = moment(new Date()).format('DD MMM YYYY')


const fetchWeatherGeo = async (lat=33.44, lon=-94.04, units='metric') => {
 
  const { data } = await axios.get(`${URL}/?lat=${lat}&lon=${lon}&units=${units}&exclude=deyly&APPID=${API_KEY}`);
     return data;
 
 }


const geoWeatherApp = () => {
     
      navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        const units = 'metric'

        // localStorage.setItem(STORAGE_LAT, lat);
        // localStorage.setItem(STORAGE_LON, lon);

      fetchWeatherGeo(lat, lon, units)
           .then(renderWeather)
            .catch(error => {});
      }) ??
      fetchWeatherGeo()
           .then(renderWeather)
            .catch(error => {});
   
    }
    
const renderWeather = (weather) => {

weatherEl.innerHTML = `
        
        <div class="weatherBlock_main-container">

        <div class="weatherBlock_weather-nav">
        <div class="weatherBlock_city-temp">
        ${Math.round(weather.main.temp)}
            <sup>&deg;</sup>
        </div>
  
        <div class="weatherBlock_city-info">
            <p class = "weatherBlock_weather-description">${weather.weather[0].description}</p>
            <p class = "weatherBlock_city-name">
                <span class = "weatherBlock_weather-name">${weather.name}</span>

            </p>
        
      </div>
    </div>
              <div class="weatherBlock_clean">
              <div class="weatherBlock_info-icon">
                  <img class="weatherBlock_city-icon" src="${`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}" alt="${weather.weather[0].description}"/>
              </div>
  
              <div  class = "weatherBlock_info-down">
                <p class="weatherBlock_info-date"> ${day} <br> ${date} </p>
              </div>

              </div>

              <div class = "weatherBlock_Btn">
                <button  type="button" class="weatherBlock_weatherBtn" id="loadWeater" >weather for week</button>
              </div>

              </div>
        `
}

geoWeatherApp();

// // ----------------------------- 7 DAY -------------------------------


const fetchWeatherForecast = async (lat=33.44, lon=-94.04, units='metric') => {
 
  const { data } = await axios.get(`${URL2}?lat=${lat}&lon=${lon}&units=${units}&APPID=${API_KEY}`);
    //  console.log(data)
     return data;
 }

 const geoWeatherForecast = () => {
     
    navigator.geolocation.getCurrentPosition(function(position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    const units = 'metric'


    fetchWeatherForecast(lat, lon, units)
    .then(renderWeatherForecast)
        .catch(error => {});
  }) ??
  fetchWeatherForecast()
  .then(renderWeatherForecast)
        .catch(error => {});

}

 const renderWeatherForecast = obj => {
             console.log('вот прогноз', obj)


            const day0 = obj.list[0]
            const day1 = obj.list[8]
            const day2 = obj.list[16]
            const day3 = obj.list[24]
            const day4 = obj.list[32]
            const day5 = obj.list[39]

            const refs = {
            temp: document.querySelector('.weather__temperature'),
            city: document.querySelector('.weatherBlock_weather-name'),
            clean: document.querySelector('.weatherBlock_clean'),
            Btn: document.querySelector(weatherBlock_weatherBtn)

            }
            refs.temp.textContent = Math.round(day1.main.temp)
            refs.city.textContent = obj.city.name;
            refs.clean.innerHTML = ''
            refs.Btn.textContent = 'weather for day'
            refs.Btn.classList.add("weatherForecast_weatherBtn")


      
          

            // console.log(moment(new Date(day1.dt*1000)).format('ddd DD MMM LT'), day1.main.temp, day1.weather[0].description)
            // console.log(moment(new Date(day2.dt*1000)).format('ddd DD MMM LT'), day2.main.temp, day2.weather[0].description)
            // console.log(moment(new Date(day3.dt*1000)).format('ddd DD MMM LT'), day3.main.temp, day3.weather[0].description)
            // console.log(moment(new Date(day4.dt*1000)).format('ddd DD MMM LT'), day4.main.temp, day4.weather[0].description)
            // console.log(moment(new Date(day5.dt*1000)).format('ddd DD MMM LT'), day5.main.temp, day5.weather[0].description)



// Анлрей, посмотри пожалуйста - из рендера ниже мне нужно только <ul> поставить в weatherBlock_clean (который создаеться в рендере выше) 
// Заменить textcontent weatherBlock_city-temp на ${Math.round(day1.main.temp)} и weatherBlock_weather-description на ${moment(new Date(day0.dt*1000)).format('ddd DD MMM')}
// заменить weatherBlock_weather-name на ${obj.city.name}

// и кнопку переименовать weather for day и изменить ей класс на weatherForecast_weatherBtn (потому что я жду появления єтого класса чтоб дать возможность вернуться к погоде на день)
// спасибо

            refs.clean.insertAdjacentHTML =  `
          
                  <ul class="weatherForecast_week-info-grid">


                  <li class="weatherForecast_item weatherForecast_item-a">
                  <p class="weatherForecast_item-a"> 5-DAY Forecast ${moment(new Date(day0.dt*1000)).format('LT')}</p>
                  </li>
                  
                  <li class="weatherForecast_item">
                  <p class="weatherForecast_item-temp">${Math.round(day1.main.temp)} <sup>&deg;</sup></p>
                  <p class="weatherForecast_item-info"> ${moment(new Date(day1.dt*1000)).format('ddd DD MMM')} </p>
                  </li>
                  <li class="weatherForecast_item">
                  <p class="weatherForecast_item-temp">${Math.round(day2.main.temp)} <sup>&deg;</sup></p>
                  <p class="weatherForecast_item-info"> ${moment(new Date(day2.dt*1000)).format('ddd DD MMM')} </p>
                  </li>
                  <li class="weatherForecast_item">
                  <p class="weatherForecast_item-temp">${Math.round(day3.main.temp)} <sup>&deg;</sup></p>
                  <p class="weatherForecast_item-info"> ${moment(new Date(day3.dt*1000)).format('ddd DD MMM')} </p>
                  </li>
                  <li class="weatherForecast_item">
                  <p class="weatherForecast_item-temp">${Math.round(day4.main.temp)} <sup>&deg;</sup></p>
                  <p class="weatherForecast_item-info"> ${moment(new Date(day4.dt*1000)).format('ddd DD MMM')} </p>
                  </li>
                  <li class="weatherForecast_item">
                  <p class="weatherForecast_item-temp">${Math.round(day5.main.temp)} <sup>&deg;</sup></p>
                  <p class="weatherForecast_item-info"> ${moment(new Date(day5.dt*1000)).format('ddd DD MMM')} </p>
                  </li>
          
                  </ul>
                
                `;

var todayTempElement = document.querySelector('.weatherBlock_weather-description');
var animation = todayTempElement.animate([
  {transform: 'translate(0)'},
  {transform: 'translate(-10px)'}
], 500);
animation.addEventListener('finish', function() {
  todayTempElement.style.transform = 'translate(0px)';
})

var todayTempElement = document.querySelector('.weatherForecast_week-info-grid');
var animation = todayTempElement.animate([
  {transform: 'translate(0)'},
  {transform: 'translate(-10px)'}
], 500);
animation.addEventListener('finish', function() {
  todayTempElement.style.transform = 'translate(0px)';
})
 }



            // document.addEventListener("click", (event)=>{
            //   if(event.target?.classList.contains("weatherForecast_weatherBtn")){
            //     weatherEl.innerHTML = '';
                
            //     geoWeatherApp()
            //   }
            //   })

              document.addEventListener("click", (event)=>{
                if(event.target?.classList.contains("weatherBlock_weatherBtn")){        
                  console.log('Покажи прогноз 5дней')    
                  geoWeatherForecast()
                }
              }
                  )

