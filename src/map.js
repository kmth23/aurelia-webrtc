import {inject} from 'aurelia-framework';
import mapsapi from 'google-maps-api';

@inject(mapsapi('AIzaSyAdAMosmnoJJwC7jpoHUjQdX6GRUBQf8gs'))
export class Map {
  constructor(mapsapi) {
    this.getlocation().then((pos) => {
      let maps = mapsapi.then((maps) => {
        this.maps = maps;
        this.geocoder = new this.maps.Geocoder();
      }).then(() => {
        let latlng = new this.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        let opts = {
          zoom: 15,
          center: latlng,
          mapTypeId: this.maps.MapTypeId.ROADMAP
        };
        this.map = new this.maps.Map(document.getElementById("map_canvas"), opts);
        // ピンを立てる
        let currentMarker = new this.maps.Marker({
          position: latlng
        });
        currentMarker.setMap(this.map);
        // 誤差を円で描く
        new this.maps.Circle({
          map: this.map,
          center: latlng,
          radius: pos.coords.accuracy,
          strokeColor: '#0088ff',
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: '#0088ff',
          fillOpacity: 0.2
        });
        this.map.panTo(latlng);
      });
    });
  }
  
  // 現在地を取得
  getlocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          resolve(pos);
        }, (error) => {
          reject(error);
        });
      } else {
        let pos = {};
        pos.coords = {};
        pos.coords.latitude = 35.709984;
        pos.coords.longitude = 139.810703;
        pos.coords.accuracy  = 100;
        reject(pos); 
      }
    });
  }
}
