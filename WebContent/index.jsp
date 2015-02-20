<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<style>
html,body{
height:100%;
margin:0;
}
#map
{
height:100%;
margin:0;
}
</style>
<body onLoad="initialize();">
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?libraries=places"></script>
<div id="map"> </div>
<script>
var map;
var service;
var infowindow;
//var string = "marathalli+bangalore";
var string = "Salarpuria Infinity 3rd Floor #5 Bannerghatta Road Bangalore-560029";
function initialize() {
  var pyrmont = new google.maps.LatLng(12.9715987,77.5945627);

  map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

  var request = {
    location: pyrmont,
    radius: '50000',
    query: string
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

	  
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      console.log(place);
     createMarker(results[i]);
    }
  }
}

function createMarker(place) {
	  var placeLoc = place.geometry.location;
	  var marker = new google.maps.Marker({
	    map: map,
	    position: place.geometry.location
	  });
}
</script>
</body>
</html>