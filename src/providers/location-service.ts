import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Geolocation } from 'ionic-native';
import { PlineLocation } from '../domain/pline-location';


declare var google;

@Injectable()
export class LocationService {

  geocoder = new google.maps.Geocoder;

  public getCurrentPlineLocation(): Promise<PlineLocation> {
    var ctx = this;
    let options = { enableHighAccuracy: true };
    return Geolocation.getCurrentPosition(options).then((position) => {
      return new Promise<PlineLocation>((resolve, reject) => {
        var latlng = { lat: position.coords.latitude, lng: position.coords.longitude };
        ctx.geocoder.geocode({ 'location': latlng }, function (results, status) {
           resolve(new PlineLocation(latlng.lat,latlng.lng, results[0].formatted_address));
        });
      });
    });
  }

  public getPlineLocationFor(address: string): Promise<PlineLocation> {
    var ctx = this;
    return new Promise(function (resolve) {
      var plineLocation = new PlineLocation();
      ctx.geocoder.geocode({ 'address': address }, function (results, status) {
        //console.log("geocoded");
        //console.log(results);
      });
      resolve(plineLocation);
    });
  }
}
