# Google Map API
http://www.ajaxtower.jp/googlemaps/charset/index1.html

## jspm
http://stackoverflow.com/questions/31145462/how-to-load-google-maps-javascript-api-in-aiurelia-javascript-application

package.json

    "jspm": {  
      "dependencies": {  
        "google-maps-api": "npm:google-maps-api@^2.0.0"  
      }  
    }  

javascript

    import {inject} from 'aurelia-framework';
    import mapsapi from 'google-maps-api';
    
    @inject(mapsapi('AIzaSyAdAMosmnoJJwC7jpoHUjQdX6GRUBQf8gs'))
    export class Map {
      constructor(mapsapi) {
        let maps = mapsapi.then((maps) => {
          this.maps = maps;
          this.geocoder = new google.maps.Geocoder();
          let latlng = new google.maps.LatLng(35.709984, 139.810703);
          let opts = {
            zoom: 15,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          let map = new google.maps.Map(document.getElementById("map_canvas"), opts);
        });
      }
    }

## GPS
http://www.tam-tam.co.jp/tipsnote/javascript/post4139.html