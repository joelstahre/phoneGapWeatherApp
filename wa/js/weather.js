
var J = J || {};

J.WeatherApp = function () {
    var that = this;






this.key = 'x38g2qmfh6d37sqstamuv5wm';

this.location = ''; 
this.latitude = '';
this.longitude = '';

this.date = '';
this.city = '';
this.temp = '';
this.maxTemp = '';
this.minTemp = '';
this.wind = '';
this.humidity = '';
this.description = '';
this.imgURL = '';


//extended
this.date1 = '';
this.date2 = '';
this.date3 = '';

this.imgURL1 = '';
this.imgURL2 = '';
this.imgURL3 = '';

this.description1 = '';
this.description2 = '';
this.description3 = '';




this.searchField = document.getElementById("searchField");
this.submitBTN = document.getElementById("submitBTN");
this.locationBTN = document.getElementById("locationBTN");


this.dateElem = document.getElementById("date");
this.cityElem = document.getElementById("city");
this.tempElem =document.getElementById("temp");
this.maxTempElem = document.getElementById("maxTemp");
this.minTempElem = document.getElementById("minTemp");
this.windElem = document.getElementById("wind");
this.humidityElem = document.getElementById("humidity");
this.descriptionElem = document.getElementById("description");
this.iconElem = document.getElementById("icon");


//extended
this.date1Elem = document.getElementById("date1");
this.date2Elem = document.getElementById("date2");
this.date3Elem = document.getElementById("date3");

this.imgURL1Elem = document.getElementById("icon1");
this.imgURL2Elem = document.getElementById("icon2");
this.imgURL3Elem = document.getElementById("icon3");

this.description1Elem = document.getElementById("description1");
this.description2Elem = document.getElementById("description2");
this.description3Elem = document.getElementById("description3");


this.submitBTN.onclick = function(){

  that.location = that.searchField.value;
  that.getWeather();
}

this.locationBTN.onclick = function(){
    
    that.getLocation();
}

// Look up the current position at application start.
this.getLocation();


};

J.WeatherApp.prototype.getLocation = function(){
    var that = this;
    

    // IF the client supports geolocation.
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){

        that.latitude = position.coords.latitude;
        that.longitude = position.coords.longitude;
        that.location = that.latitude + "," + that.longitude;

        console.log("Lat: " + that.latitude + " Long: " + that.longitude);


        // Translating the lat & long cordinates to Adress name.
        $.ajax({
          url: "http://maps.googleapis.com/maps/api/geocode/json?latlng="+ that.location + "&sensor=false",
          dataType: 'json',
          crossDomain: true,
          success: function(data) {
            
            that.location = data.results[5].formatted_address;
            console.log(that.location);

      

            that.getWeather();

          }
        });      
			});
    } else {
      console.log("Client do not support geolocation")
    }   
};


J.WeatherApp.prototype.getWeather = function(){
  var that = this;



  
    // Fetching weather data to the current location. 
    $.ajax({
      url: 'http://api.worldweatheronline.com/free/v1/weather.ashx?key=' + this.key + '&q=' + this.location + '&num_of_days=3&fx=yes&format=json',
      dataType: 'jsonp',
	    crossDomain: true,
      success: function(data) {
        
        console.log(data);
        
        that.date = data.data.weather[0].date;
        that.city = data.data.request[0].query;
        that.temp = data.data.current_condition[0].temp_C;
        that.maxTemp = data.data.weather[0].tempMaxC;
        that.minTemp = data.data.weather[0].tempMinC;
        that.wind = data.data.current_condition[0].windspeedKmph;
        that.humidity = data.data.current_condition[0].humidity;
        that.description = data.data.current_condition[0].weatherDesc[0].value;
        that.imgURL = data.data.current_condition[0].weatherIconUrl[0].value;
        
        that.imgURL = that.imgURL.substr(59, 50)


        //Extended
        that.date1 = data.data.weather[0].date;
        that.date2 = data.data.weather[1].date;
        that.date3 = data.data.weather[2].date;

        that.imgURL1 = data.data.weather[0].weatherIconUrl[0].value;
        that.imgURL1 = that.imgURL1.substr(59, 50)
        that.imgURL2 = data.data.weather[1].weatherIconUrl[0].value;
        that.imgURL2 = that.imgURL2.substr(59, 50)
        that.imgURL3 = data.data.weather[2].weatherIconUrl[0].value;
        that.imgURL3 = that.imgURL3.substr(59, 50)

        that.description1 = data.data.weather[0].weatherDesc[0].value;
        that.description2 = data.data.weather[1].weatherDesc[0].value;
        that.description3 = data.data.weather[2].weatherDesc[0].value;
        console.log(that.description1);

     
        that.generateHTML();

      }
    });

};


J.WeatherApp.prototype.generateHTML = function(){

  this.dateElem.innerHTML = this.date;
  this.cityElem.innerHTML = this.city;
  this.tempElem.innerHTML = this.temp + '°';
  this.maxTempElem.innerHTML = this.maxTemp + '°';
  this.minTempElem.innerHTML = this.minTemp + '°';
  this.windElem.innerHTML = this.wind + ' Kmph';
  this.humidityElem.innerHTML = this.humidity + '%';
  this.descriptionElem.innerHTML = this.description;
  this.iconElem.src ="img/symbols/" + this.imgURL;
  


  // Extended forecast

  this.date1Elem.innerHTML = this.date1;
  this.date2Elem.innerHTML = this.date2;
  this.date3Elem.innerHTML = this.date3;

  this.imgURL1Elem.src ="img/symbols/" + this.imgURL1;
  this.imgURL2Elem.src ="img/symbols/" + this.imgURL2;
  this.imgURL3Elem.src ="img/symbols/" + this.imgURL3;

  this.description1Elem.innerHTML = this.description1;
  this.description2Elem.innerHTML = this.description2;
  this.description3Elem.innerHTML = this.description3;



};

$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
	$.mobile.ajaxEnabled = true;
  $.mobile.pushStateEnabled = false;
  $.mobile.allowCrossDomainPages = true;
	$.support.cors = true;
});


window.onload = function() {

    new J.WeatherApp(); 
    
}