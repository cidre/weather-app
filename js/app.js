const app = {
    "cityHelpList": [],
    "cityHelpListLimit": 7,
    "doc": {}
}

app.doc.input = document.getElementById("cityInput");


window.addEventListener('DOMContentLoaded', function() {
    let req = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=0ee6f6ceb5be28ba6e2834ac7806e156';  
 
    alert(cityList[0].name);
    // fetch(req);
	//alert('Ready!');
	//let myFile = File.createFromFileName("cities/city_list.json");
    //var reader = new FileReader();
    //reader.readAsDataURL(myFile);
	//var mydata = JSON.parse(reader);
    //alert(mydata[0].name);
    //alert(mydata[0].country);
    //alert(mydata[1].name);
    //alert(mydata[1].country);

    //usage:
    //readTextFile("cities/city_list.json", function(text){
    //var data = JSON.parse(text);
    //console.log(data[0].name);
    //});
});

function relevantCity(cityObj, searchName) {
    return cityObj.name.toUpperCase().indexOf(searchName) > -1;
}

function defineCityHelpList(searchString, cityHelpListLimit){
    let cityHelpList = [];
    const searchName = searchString.toUpperCase();
    for (let cityObj of cityList) {
        if (relevantCity(cityObj, searchName)) {
            cityHelpList.push(cityObj);
        }
        if (cityHelpList.length >= cityHelpListLimit) break;
    }
    return cityHelpList;
}

function processCityInput(){
    app.cityHelpList = defineCityHelpList(app.doc.input.value, app.cityHelpListLimit);
}