var MapWrapper = require('./models/mapWrapper');

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url)
  request.addEventListener('load', callback);
  request.send();
}

var requestComplete = function(){
  if (this.status !== 200) return console.log("Request failed");
  console.log("Request successful")
  var jsonString = this.responseText;
  var apiData = JSON.parse(jsonString);
  console.log(apiData);
  populateMap();
  populateList(apiData);
}

var populateMap = function(){
  var container = document.getElementById('map');
  var center = { lat: 55.856843, lng: -4.244117 };
  var zoom = 15;

  mainMap = new MapWrapper(container, center, zoom);
  // geolocation
  mainMap.userLocation();
  // search box
  var input = document.createElement('input');
  input.id = "search-input";
  input.class = "controls";
  input.type = "text";
  input.placeholder = "Search for a location";
  console.log(input);
  // create new google maps search box from input element
  mainMap.createSearchBox(input);

}

var populateList = function(data) {
  var ul = document.getElementById("#list-header");
  for (var bar of data) {
    createBarData(bar);
  }
};
// create the bar list data and append to the header
var createBarData = function(bar) {
  var barUl = document.getElementById("list-header")
  var barLi = document.createElement("li-bar");
  barLi.append(createBarName(bar.name));
  barLi.append(createBarAddress(bar.address));
  barLi.append(createBarDescription(bar.description));
  barLi.append(createThumbnail(bar.image));
  barUl.append(barLi);
}

var createBarName = function(name) {
  var nameElement = document.createElement("bar-name");
  nameElement.append(name);
  return nameElement;
};

var createBarAddress = function(address) {
  var addressElement = document.createElement("bar-address");
  addressElement.append(address);
  return addressElement;
};

var createBarDescription = function(description) {
  var descriptionElement = document.createElement("bar-description");
  descriptionElement.append(description);
  return descriptionElement;
};

var createThumbnail = function(image) {
  var thumbnailElement = document.createElement("bar-thumbnail");
  var pic = document.createElement("img");
  thumbnailElement.appendChild(pic);
  pic.src = image;
  return thumbnailElement;
};

var app = function() {
  console.log("Running app");
  var url = "/bars";
  makeRequest(url, requestComplete);
};

window.addEventListener("load", app);
