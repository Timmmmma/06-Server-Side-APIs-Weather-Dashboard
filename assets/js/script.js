var userInput = document.querySelector("#inputCity");
var searchBar = document.querySelector(".search");

var key = "9fa804cada84c0549edbf15036d7030b";

function currentDay() {
    let today = moment();
    //Dispaly the date and time
    $("#currentTime").text(today.format("dddd, MMMM Do YYYY, h:mm:ss"));

}

setInterval(currentDay);


function getWeather(city) {
    let today = moment();
    $("#todayHeader").text(city + " (" + today.format("DD/MM/YYYY") + ")");
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + key;
    fetch(queryURL)
        .then(function(Response) {
            if (Response.status === 404) {
                alert("Error!");
              }else {
                return Response.json();
                
              }
        })
        .then(function(current){
            document.querySelector(".icon").src ="http://openweathermap.org/img/wn/"+current.weather[0].icon+"@2x.png";
            $(".temp").text(current.main.temp + "° F");
            $(".wind").text(current.wind.speed + " mil/hr");
            $(".humidity").text(current.main.humidity + " %");
            var lat = current.coord.lat;
            var lon = current.coord.lon;
            getUvIndex(lat, lon);
            getWeather5(city);
            
        })
}



function getWeather5(city) {
    var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" +city+ "&units=imperial&appid=" + key;
    fetch(queryURL3)
        .then(function(Response) {
            if (Response.status === 404) {
                alert("Error!");
              }else {
                return Response.json();
                
              }
        })
        .then(function(Response){
            console.log(Response);
            $("#day1Header").text(moment().add(1, 'days').format("DD/MM/YYYY"));
            document.querySelector(".icon1").src ="http://openweathermap.org/img/wn/"+Response.list[5].weather[0].icon+"@2x.png";
            $(".temp1").text(Response.list[5].main.temp + "° F");
            $(".wind1").text(Response.list[5].wind.speed + " mil/hr");
            $(".humidity1").text(Response.list[5].main.humidity + " %");

            $("#day2Header").text(moment().add(2, 'days').format("DD/MM/YYYY"));
            document.querySelector(".icon2").src ="http://openweathermap.org/img/wn/"+Response.list[13].weather[0].icon+"@2x.png";
            $(".temp2").text(Response.list[13].main.temp + "° F");
            $(".wind2").text(Response.list[13].wind.speed + " mil/hr");
            $(".humidity2").text(Response.list[13].main.humidity + " %");

            $("#day3Header").text(moment().add(3, 'days').format("DD/MM/YYYY"));
            document.querySelector(".icon3").src ="http://openweathermap.org/img/wn/"+Response.list[21].weather[0].icon+"@2x.png";
            $(".temp3").text(Response.list[21].main.temp + "° F");
            $(".wind3").text(Response.list[21].wind.speed + " mil/hr");
            $(".humidity3").text(Response.list[21].main.humidity + " %");

            $("#day4Header").text(moment().add(4, 'days').format("DD/MM/YYYY"));
            document.querySelector(".icon4").src ="http://openweathermap.org/img/wn/"+Response.list[29].weather[0].icon+"@2x.png";
            $(".temp4").text(Response.list[29].main.temp + "° F");
            $(".wind4").text(Response.list[29].wind.speed + " mil/hr");
            $(".humidity4").text(Response.list[29].main.humidity + " %");

            $("#day5Header").text(moment().add(5, 'days').format("DD/MM/YYYY"));
            document.querySelector(".icon5").src ="http://openweathermap.org/img/wn/"+Response.list[37].weather[0].icon+"@2x.png";
            $(".temp5").text(Response.list[37].main.temp + "° F");
            $(".wind5").text(Response.list[37].wind.speed + " mil/hr");
            $(".humidity5").text(Response.list[37].main.humidity + " %");
            
        })
}

function getUvIndex(lat, lon) {
    console.log("get");
    var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=daily&units=imperial&appid=" + key;
    
    fetch(queryURL2)
    .then(function(Response) {
        if (Response.status === 404) {
            alert("Error!");
          }else {
            return Response.json();
            
          }
    })
    .then(function(Response){
        var currentUvi = Response.current.uvi
        $("#UVIndex").text(currentUvi);
        //var UVColor = document.querySelector(".UVIndex")
        console.log(currentUvi);
        if(currentUvi <= 0.5){
            //UVColor.classList = "badge text-bg-success p-3";
            $("a").attr("class","green");
         } else if (currentUvi > 0.5 && currentUvi <=1){
            $("a").attr("class","yellow");
         } else if (currentUvi > 1 && currentUvi <=3){
            $("a").attr("class","orange");
         }else{
            $("a").attr("class","red");  
         }
        
    })
    
        

}

function saveHistory(cityName) {
    if (cityName == "") {
        console.log("No value entered!");
        alert("No value entered!");
    }else {
        //var historyBtn = document.createElement("button");
        //historyBtn.classList = "newBtn btn btn-light col-12 col-sm-11 text-center p-2 m-1";
        //historyBtn.textContent = cityName;
        //searchBar.append(historyBtn);
        
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

        var varText = "";
        for (var i = 0; i < allCities.length; i++) {
        varText += `<li class="newBtn btn btn-light col-12 col-sm-11 text-center p-2 m-1" onclick="getWeather('`+allCities[i].city+`')">`+allCities[i].city+`</li>`;
        }
        $(`#cityListGroup`).html(varText);

    }
    
}


$("#searchBtn").on("click", function(){
    if (cityName == "") {
        console.log("No value entered!");
        alert("No value entered!");
    }else {
        var cityName = userInput.value;
        console.log(cityName);
        getWeather(cityName);
        saveHistory(cityName);
    }
    
});

function masage(){
    alert("no");
}

$(".111").on("click", function(){
    alert("langlang");
    //getWeather(cityName);
})

