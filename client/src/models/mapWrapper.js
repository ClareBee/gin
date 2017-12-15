var MapWrapper = function(container, coords, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
  this.markers = [];
}

MapWrapper.prototype.addMarker = function(bar){
  var marker = new google.maps.Marker({
    position: bar.coords,
    icon: "/icons/gnss.png",
    infoWindowOpen: false,
    map: this.googleMap
  });

  this.markers.push(marker);
  var contentString = '<div id="content">'+
  '<div id="bodyContent">'+
  `<h3 id="bar-name">${bar.name}</h3>` +
  `<h5>Location: ${bar.coords}</h5>`+
  '</div>'+
  '</div>';
  marker.infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener('click', function(){
    for (var mark of this.markers){
      if (mark.infowindowOpen){
        mark.infowindow.close();
      }
    }
    marker.infowindow.open(this.googleMap, marker);
    marker.infowindowOpen = true;
  }.bind(this));

}

MapWrapper.prototype.centerFunction = function(coords){
  this.googleMap.setCenter(coords);
  this.googleMap.setMapTypeId('hybrid');
  this.googleMap.setZoom(10);
}

MapWrapper.prototype.userLocation = function(){
  navigator.geolocation.getCurrentPosition(function(position){
    var coords = {lat: position.coords.latitude, lng: position.coords.longitude};
    this.googleMap.setCenter(coords);
    this.googleMap.setMapTypeId('hybrid');
    this.googleMap.setZoom(19);
    this.addMarker(coords);
  }.bind(this));
}

module.exports = MapWrapper;