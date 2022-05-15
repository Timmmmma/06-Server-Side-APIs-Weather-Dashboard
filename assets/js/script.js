var userInput = document.querySelector("#inputCity")
var searchBar = document.querySelector(".search")

function currentToday() {
    let today = moment();
    //Dispaly the date and time
    $("#currentTime").text(today.format("dddd, MMMM Do YYYY, h:mm:ss"));

}

setInterval(currentToday);

function getWeather(city){
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" +city+ "&units=imperial&appid=9fa804cada84c0549edbf15036d7030b";
    fetch(queryURL)
        .then(function(Response) {
            return Response.json();
        })
}

function saveHistory(cityName) {
    if (cityName == "") {
        console.log("No value entered!");
        alert("No value entered!");
    }else {
        var historyBtn = document.createElement("button");
        historyBtn.classList = "btn btn-light col-12 col-sm-11 text-center p-2 m-1";
        historyBtn.textContent = cityName;
        searchBar.append(historyBtn);
        
        var cityList = {
            city : cityName,
        };
        console.log(cityList);
        
        var allCities = localStorage.getItem("allCities");
            if (allCities === null) {
                allCities = [];
            } else {
                allCities = JSON.parse(allCities);
            }
            allCities.push(cityList);
        var newCity = JSON.stringify(allCities);
        localStorage.setItem("allCities", newCity);

    }
    
}



$("#searchBtn").on("click", function(){
    var cityName = userInput.value;
    console.log(cityName);
    getWeather(cityName);
    saveHistory(cityName);
});