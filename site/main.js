function initMap() {
  var mapCanvas = document.getElementById('map-canvas');
  var mapOptions = {
    center: new google.maps.LatLng(51.528837, -0.165653),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(mapCanvas, mapOptions);

  map.set('styles', [
  {
    "featureType": "water",
    "stylers": [
    {
      "color": "#021019"
    }
    ]
  },
  {
    "featureType": "landscape",
    "stylers": [
    {
      "color": "#08304b"
    }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
    {
      "color": "#0c4152"
    },
    {
      "lightness": 5
    }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
    {
      "color": "#000000"
    }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
    {
      "color": "#0b434f"
    },
    {
      "lightness": 25
    }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [
    {
      "color": "#000000"
    }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry.stroke",
    "stylers": [
    {
      "color": "#0b3d51"
    },
    {
      "lightness": 16
    }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [
    {
      "color": "#000000"
    }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
    {
      "color": "#ffffff"
    }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
    {
      "color": "#000000"
    },
    {
      "lightness": 13
    }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
    {
      "color": "#146474"
    }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [
    {
      "color": "#000000"
    }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
    {
      "color": "#144b53"
    },
    {
      "lightness": 14
    },
    {
      "weight": 1.4
    }
    ]
  },
  {
    "featureType": "all",
    "elementType": "labels",
    "stylers": [
    {
      "visibility": "off"
    }
    ]
  }
  ]);

  map.data.setStyle(function() {
    return {
      icon: {
        path: google.maps.SymbolPath.CIRCLE, 
        fillColor: "white",
        fillOpactiy: 1,
        strokeColor: "white",
        strokeOpacity: 1,
        strokeWeight: 3 
      }
    };
  });

  $.get( 'https://api.mongolab.com/api/1/databases/twitviz/collections/tweets?apiKey='+config.mongolabKey+'&q={"type":"Feature"}', function( data ) {
    for (var i = data.length - 1; i >= 0; i--) {
      map.data.addGeoJson(data[i]);
    };
  });

  map.data.addListener('click', function(event) {
    event.feature.toGeoJson(function(data) {
      $('#display').text(data.geometry.coordinates)
    });
  });

}

google.maps.event.addDomListener(window, 'load', initMap);