const app = {
    "doc": {}
}

app.doc.input = document.getElementById("cityInput");


window.addEventListener('DOMContentLoaded', function() {
    let req = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=0ee6f6ceb5be28ba6e2834ac7806e156';  
    let res = fetch(req).then( function(response) {
        return response.json();
}   );
    let weather = res.then(function(response) {
        return response.main;
}   );
    console.log(weather); 
});

function processCityInput(){
    app.cityHelpList = defineCityHelpList(app.doc.input.value, app.cityHelpListLimit);
    renderCityHelpList();
}