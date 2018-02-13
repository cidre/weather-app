const app = {
    "id": "0ee6f6ceb5be28ba6e2834ac7806e156",
    "weatherHost": "http://api.openweathermap.org/data/2.5/weather",
    "doc": {},
    "req": "",
    "mainCity": {},
    "recentList": [],
    "favoriteList": []
}

const doc = {};

doc.input = document.getElementById("cityInput");
doc.mainCity = document.getElementById('mainCity');
doc.leftPanel = document.getElementById('left-panel');

const weatherData = [];

function init(){
    if (localStorage.length > 0) {
        let resent = localStorage.getItem("resent");
        app.recentList = JSON.parse(resent);
    }
}

window.addEventListener('DOMContentLoaded', function() {
    init();
    // let req = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=0ee6f6ceb5be28ba6e2834ac7806e156';  
    // fetch(req)
    // .then(blob => blob.json())
    // .then(data => console.log(data)//weatherData.push(...data)
    // );

});

function createURL(cityName){
    return app.weatherHost + "?q=" + cityName + "&appid=" + app.id;
}

function getURL(url){
    return fetch(url);
}

function addRecent(){
    if (!app.recentList.includes(app.mainCity.name)) {
        app.recentList.push(app.mainCity.name);
        localStorage.setItem('resent', JSON.stringify(app.recentList));
    } 
}

function parseWeather(weatherJson){
    app.mainCity.id = weatherJson.id;   
    app.mainCity.name = weatherJson.name;   
    app.mainCity.dt = weatherJson.dt;   
    app.mainCity.main = weatherJson.main;   
    app.mainCity.wind = weatherJson.wind;   
    app.mainCity.weather = weatherJson.weather[0];   
    addRecent();
}

function removeChildElem(elem) {
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }
}

function renderMainCity(){
    //removeChildElem(doc.mainCity);
    //const mainCityView = removeChildElem(doc.mainCity.cloneNode(true));
    let mainCityCard = document.createElement('div');
    mainCityCard.classList.add("mainCity");
    mainCityCard.id = "mainCity";
    let cityName = document.createElement('h1');
        cityName.innerHTML = app.mainCity.name;
        // obj.style.backgroundImage = 'url(images/sun.png)';
        // <h1>&#43; &#45; 26&#176; &larr; &uarr; &rarr; &darr;</h1>
    mainCityCard.appendChild(cityName);
    //doc.mainCity.replaceWith(mainCityCard);
    doc.mainCity.parentNode.replaceChild(mainCityCard, doc.mainCity);
    doc.mainCity = document.getElementById('mainCity');
    console.log(doc.mainCity.parentNode);
}

function addToRecentList(){
    alert('Ups...');
}

function processCityInput(e){
    e = e || window.event;
    if (e.keyCode == 13) {
        getURL(createURL(doc.input.value))
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('Network response was not ok.');
        })
        .then(parseWeather)
        .then(renderMainCity)
        .then(addToRecentList)
        .catch(e => alert(e))
    }
}

function showLeftPanel(){
    doc.leftPanel.classList.toggle("show");
}
