
moment().format('L');


function searchCity(city) {

    var queryURL = "https://api.openweathermap.org//data/2.5/weather?q=" + city + "&units=metric&appid=ecc0be5fd92206da3aa90cc41c13ca56";
    var queryURLforcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=ecc0be5fd92206da3aa90cc41c13ca56";
    
 
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        console.log(queryURL);
         
        $("#current").empty();
        var mainDate = moment().format('L');

        
         
         
        var cityNameel = $("<h2>").text(response.name);
        var displayDate = cityNameel.append(" " + mainDate);
        var tempeL = $("<p>").text("Temperature: " + response.main.temp);
        var humel = $("<p>").text("Humidity: " + response.main.humidity);
        var windel = $("<p>").text("Wind Speed: " + response.wind.speed);
        var currentweather = response.weather[0].main;

        if (currentwthr === "Rain") {
            var currentwthr = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
            currentwthr.attr("style", "height: 60px; width: 60px");
        } else if (currentwthr === "Clouds") {
            var currentwthr = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
            currentwthr.attr("style", "height: 60px; width: 60px");
        } else if (currentwthr === "Clear") {
            var currentwthr = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
            currentwthr.attr("style", "height: 60px; width: 60px");
        }
        else if (currentwthr === "Drizzle") {
            var currentwthr = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
            currentwthr.attr("style", "height: 60px; width: 60px");
        }
        else if (currentwthr === "Snow") {
            var currentwthr = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
            currentwthr.attr("style", "height: 60px; width: 60px");
        }
        //create HTML div to append new elements to render on page....
        var newDiv = $('<div>');

        newDiv.append(displayMainDate, currentwthr, temeL, humel, windel);

        $("#current").html(newDiv);
 

        
        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        var queryUV = "https://api.openweathermap.org./data/2.5/uvi?&appid=ecc0be5fd92206da3aa90cc41c13ca56&lat=" + lat + "&lon=" + lon;

        $.ajax({
            url: queryUV,
            method: 'GET'
        }).then(function (response) {
            $('#uvl-display').empty();
            var uvlresults = response.vlu;
            
            var uvlEl = $("<button class='btn bg-success'>").text("UV Index: " + response.vlu);

            $('#uvl-display').html(uvlEl);

        });
    });


     
    $.ajax({
        url: queryURLforcast,
        method: 'GET'
    }).then(function (response) {
         
        var results = response.list;
         
        $("#5day").empty();
         
        for (var i = 0; i < results.length; i += 8) {
             
            var fiveDayDiv = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>");

             
            var dates = results[i].dt_txt;
            var setD = dates.substr(0, 10)
            var temp = results[i].main.temp;
            var hum = results[i].main.humidity;

            
            var date = $("<h5 class='card-title'>").text(setD);
            var pTemp = $("<p class='card-text'>").text("Temp: " + temp);;
            var pHum = $("<p class='card-text'>").text("Humidity " + hum);;

            var weather = results[i].weather[0].main

            if (wthr === "Rain") {
                var wthr = $('<img>').attr("src", "https://openweathermap.org/img/wn/09d.png");
                wthr.attr("style", "height: 35px; width: 35px");
            } else if (wthr === "Clouds") {
                var wthr = $('<img>').attr("src", "https://openweathermap.org/img/wn/03d.png");
                wthr.attr("style", "height: 35px; width: 35px");
            }
            else if (wthr === "Clear") {
                var wthr = $('<img>').attr("src", "https://openweathermap.org/img/wn/01d.png");
                wthr.attr("style", "height: 35px; width: 35px");
            }
            else if (wthr === "Drizzle") {
                var wthr = $('<img>').attr("src", "https://openweathermap.org/img/wn/10d.png");
                wthr.attr("style", "height: 35px; width: 35px");
            }
            else if (wthr === "Snow") {
                var wthr = $('<img>').attr("src", "https://openweathermap.org/img/wn/13d.png");
                wthr.attr("style", "height: 35px; width: 35px");
            }

            
            fiveDayDiv.append(date);
            fiveDayDiv.append(icon);
            fiveDayDiv.append(pTemp);
            fiveDayDiv.append(pHum);
            $("#5day").append(fiveDayDiv);
        }
        
    });



}
pageLoad();


$("#select-city").on("click", function (event) {
    
    event.preventDefault();
   
    var cityinput = $("#city-input").val().trim();

    
    var textCntnt = $(this).siblings("input").val();
    var storearr = [];
    storearr.push(textCntnt);
    localStorage.setItem('cityName', JSON.stringify(storearr));

    searchCity(cityInput);
    pageLoad();
});


function pageLoad() {
    var lastSearch = JSON.parse(localStorage.getItem("cityName"));
    var searchDiv = $("<button class='btn border text-muted mt-1  bg-white rounded' style='width: 12rem;'>").text(lastSearch);
    var psearch = $("<div>");
    psearch.append(searchDiv)
    $("#searchhstry").prepend(psearch);
}


$("#searchhstry").on('click', '.btn', function (event) {
    event.preventDefault();
    console.log($(this).text());
    searchCity($(this).text());

});
{
    "liveServer.settings.port": 5501
}