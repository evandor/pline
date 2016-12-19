import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Geolocation} from 'ionic-native';
import { PlineLocation } from '../domain/pline-location';


declare var google;

@Injectable()
export class LocationService {

  geocoder = new google.maps.Geocoder;

  public getCurrentPlineLocation(): Promise<PlineLocation> {
    var ctx = this;
    let options = {enableHighAccuracy: true};
    return Geolocation.getCurrentPosition(options).then(
      function(position) {
        var pLocation = new PlineLocation();

        var latlng = { lat: position.coords.latitude, lng: position.coords.longitude };
        ctx.geocoder.geocode({ 'location': latlng }, function (results, status) {
          //console.log(results[1]);
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) { 
              pLocation.address =results[0].formatted_address;    

              // dummy call zum testen
              ctx.getPlineLocationFor(pLocation.address);
            }
          };
        });

        pLocation.latitude = position.coords.latitude;
        pLocation.longitude = position.coords.longitude;
        return pLocation;
      }, function(error) {
        console.error("Failed!", error);
      }
    );
  }

  public getPlineLocationFor(address: string): Promise<PlineLocation> {
    var ctx = this;
    return new Promise(function(resolve) {
        var plineLocation = new PlineLocation();
        ctx.geocoder.geocode({'address':address}, function(results, status) {
          //console.log("geocoded");
          //console.log(results);
        });
        resolve(plineLocation);
    });
  }
}
