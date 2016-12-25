import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PlineLocation } from '../../domain/pline-location';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html'
})
export class LocationsPage {

  locations: Array<PlineLocation> = new Array();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage) {


    storage.get('places').then((result) => {
      this.locations = result;
    });
  }

  public locationsEmpty() {
    return this.locations.length == 0;
  }

}
