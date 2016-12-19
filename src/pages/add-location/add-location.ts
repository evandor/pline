
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LocationService } from '../../providers/location-service';
import { PlineLocation } from '../../domain/pline-location';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SearchLocationModalPage } from '../search-location-modal/search-location-modal';


@Component({
  selector: 'page-add-location',
  templateUrl: 'add-location.html'
})
export class AddLocationPage {

  addLocationFormGroup: FormGroup;
  location: PlineLocation = new PlineLocation();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage, 
    private formBuilder: FormBuilder,
    public modalCtrl: ModalController) {

    this.addLocationFormGroup = this.formBuilder.group({
            locationname: ['', Validators.required],
            address: ['', Validators.required]
        });
  }

  saveLocation() {
        this.storage.get("places").then ((places)=>{
            this.location.name = this.addLocationFormGroup.value.locationname;
            this.location.address = this.addLocationFormGroup.value.address;
            places.push(this.location);
            this.storage.set("places", places);
            this.navCtrl.pop();
        });    
    }

    openSearchLocationModal() {
    let modal = this.modalCtrl.create(SearchLocationModalPage);
    modal.present();
  }

}
