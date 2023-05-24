//Created Weather API
let url_pt1 = 'https://api.openweathermap.org/data/2.5/forecast?q=';
let city = '';
let apiKey = '&appid=9f9b5e8632f575c738a54d29750eff35';
let units = '&units=imperial';
//////////////////////////////////////////////////////
let searchCity = document.getElementById('searchCity');
let searchBtn = document.getElementById('searchBtn');
let place = document.getElementById('place');
let temp = document.getElementById('temp');
let HomeBtn = document.getElementById('HomeBtn');
let temp_high = document.getElementById('temp_high');
let temp_high1 = document.getElementById('temp_high1');
let temp_high2 = document.getElementById('temp_high2');
let temp_high3 = document.getElementById('temp_high3');
let temp_high4 = document.getElementById('temp_high4');
let temp_high5 = document.getElementById('temp_high5');
let temp_low = document.getElementById('temp_low');
let temp_low1 = document.getElementById('temp_low1');
let temp_low2 = document.getElementById('temp_low2');
let temp_low3 = document.getElementById('temp_low3');
let temp_low4 = document.getElementById('temp_low4');
let temp_low5 = document.getElementById('temp_low5');
let Day1 = document.getElementById('Day1');
let Day2 = document.getElementById('Day2');
let Day3 = document.getElementById('Day3');
let Day4 = document.getElementById('Day4');
let Day5 = document.getElementById('Day5');
let favBtn = document.getElementById('favBtn');
let deleteBtn = document.getElementById('deleteBtn');
let favArr = [];
let injectFav = document.getElementById('inject');


favData = JSON.parse(localStorage.getItem('favWeather'));
console.log(favData)
if(favData && favData != null){
    favArr = favData;
    for(let i = 0; i< favData.length; i++){
        if(i === 0){
            fetchWeather(favData[i].url);
            let colDiv = document.createElement('div');
            colDiv.classList = 'col';
            let pTag = document.createElement('p');
            pTag.innerText = favData[i].name;
            pTag.addEventListener('click', e => {
            fetchWeather(favData[i].url);
        
});
colDiv.appendChild(pTag);
injectFav.appendChild(colDiv);
        }
    
        else {
            let colDiv = document.createElement('div');
            colDiv.classList = 'col';
            let pTag = document.createElement('p');
            pTag.innerText = favData[i].name;
             pTag.addEventListener('click', e => {
            fetchWeather(favData[i].url);

        });
        colDiv.appendChild(pTag);
        injectFav.appendChild(colDiv);
    }
}
}

//This is my Search button event listener. When clicked it will call my fetch weather function.
searchBtn.addEventListener('click', e => {
    //fetch weather function is being called and we are passing in our API in 4 pices
    fetchWeather(`${url_pt1}${searchCity.value}${apiKey}${units}`);
    // fetchWeather(`${url_pt1}${city}${apiKey}${units}`);
    place.innerText = search.value;
})


//Delete button code
deleteBtn.addEventListener('click', e => {
    for(let i = 0; i < favArr.length; i++){
        if(place.innerText.toLowerCase() === favArr[i].name.toLowerCase()){
            favArr.splice(i,1);
            let colDiv = injectFav.getElementsByClassName('col')[i];
            injectFav.removeChild(colDiv);
        }
    }
    localStorage.setItem('favWeather', JSON.stringify(favArr));

})
//End of Delete button code


favBtn.addEventListener('click', e => {
    let obj = {
        name: weatherArr[weatherArr.length -1].city.name,
        url: `${url_pt1}${searchCity.value}${apiKey}${units}` 
    }
    favArr.push(obj);
    let colDiv = document.createElement('div');
    colDiv.classList = 'col';
    let pTag = document.createElement('p');
    pTag.innerText = obj.name;
    pTag.addEventListener('click', e => {
    fetchWeather(obj.url);
})
    colDiv.appendChild(pTag);
    injectFav.appendChild(colDiv);

localStorage.setItem('favWeather', JSON.stringify(favArr));


});


function fetchWeather(url){
    fetch(url)
    .then(
        response => response.json()
    )
    .then(
        data => {
            console.log(data);
            // console.log(data.name);
            getWeather(data);
        }

    )
    
};



function getWeather (weatherData){
    //set weather data to Id's where you want the info to appear.
    weatherArr = [];
    weatherArr.push(weatherData);
    console.log(weatherData);
    let main = weatherData.main;
    place.innerText = weatherData.city.name;
    temp.innerText = `${parseInt(weatherData.list[0].main.temp)}`;
    temp_low.innerText = parseInt(weatherData.list[0].main.temp_min);
    temp_high.innerText = parseInt(weatherData.list[0].main.temp_max);
   
    temp_low1.innerText = parseInt(weatherData.list[1].main.temp_min);
    temp_high1.innerText = parseInt(weatherData.list[1].main.temp_max);
    temp_low2.innerText = parseInt(weatherData.list[2].main.temp_min);
    temp_high2.innerText = parseInt(weatherData.list[2].main.temp_max);
    temp_low3.innerText = parseInt(weatherData.list[3].main.temp_min);
    temp_high3.innerText = parseInt(weatherData.list[3].main.temp_max);
    temp_low4.innerText = parseInt(weatherData.list[4].main.temp_min);
    temp_high4.innerText = parseInt(weatherData.list[4].main.temp_max);
    temp_low5.innerText = parseInt(weatherData.list[5].main.temp_min);
    temp_high5.innerText = parseInt(weatherData.list[5].main.temp_max);
    // speed.innerText = parseInt(weatherData.wind.speed);
    // deg.innerText = parseInt(weatherData.wind.deg);
    // search.value;
    console.log(weatherData);
    Day1.src=`https://openweathermap.org/img/wn/${weatherData.list[1].weather[0].icon}@2x.png`;
    Day2.src=`https://openweathermap.org/img/wn/${weatherData.list[2].weather[0].icon}@2x.png`;
    Day3.src=`https://openweathermap.org/img/wn/${weatherData.list[3].weather[0].icon}@2x.png`;
    Day4.src=`https://openweathermap.org/img/wn/${weatherData.list[4].weather[0].icon}@2x.png`;
    Day5.src=`https://openweathermap.org/img/wn/${weatherData.list[5].weather[0].icon}@2x.png`;
    
    BgChange(weatherData);
}
function BgChange(weatherData) {
    const description = weatherData.list[0].weather[0].description.toLowerCase();

    if(description.includes('clear sky')){
        document.body.style.backgroundImage = "url('../Images/Sunshine.jpg')";
    }
    else if(description.includes('cloud')){
        document.body.style.backgroundImage = "url('../Images/Cloudy.jpg')";
    }
    else if(description.includes('rain')){
        document.body.style.backgroundImage = "url('../Images/Rain.jpg')";
    }
    else if(description.includes('snow')){
        document.body.style.backgroundImage = "url('../Images/Snowy.jpg')";
    }
    else if(description.includes('fog')){
        document.body.style.backgroundImage = "url('../Images/Foggy.jpg')";
    }
    else if(description.includes('lightning')){
        document.body.style.backgroundImage = "url('../Images/lightning.jpg')";
    }
    else{
        document.body.style.backgroundImage = "url('../Images/default.jpg')";
    }
    
}



