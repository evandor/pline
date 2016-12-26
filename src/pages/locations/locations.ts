import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlineLocation } from '../../domain/pline-location';
import { Storage } from '@ionic/storage';
import { AddLocationPage } from '../add-location/add-location';


@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html'
})
export class LocationsPage {

  locations: Array<PlineLocation> = new Array();
  

  constructor(
    public navCtrl: NavController,
    public storage: Storage) {


    
  }

  ionViewDidEnter(){
      this.storage.get('places').then((result) => {
      this.locations = result;
    });
    
  }

  public locationsEmpty() {
    return this.locations.length == 0;
  }

  removeLocation(location: PlineLocation) {
    console.log("Location to be deleted:", location);
    for (var i = 0; i < this.locations.length; i++) {

      if (this.locations[i] == location) {
        this.locations.splice(i, 1);
        this.storage.set('places', this.locations);
      }
    }
  }

  openAddLocationPage() {
    this.navCtrl.push(AddLocationPage);
  }

}
