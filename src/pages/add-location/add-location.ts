
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LocationService } from '../../providers/location-service';
import { PlineLocation } from '../../domain/pline-location';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SearchLocationModalPage } from '../search-location-modal/search-location-modal';

declare var google;

@Component({
  selector: 'page-add-location',
  templateUrl: 'add-location.html'
})
export class AddLocationPage implements OnInit {

  addLocationFormGroup: FormGroup;
  location: PlineLocation = new PlineLocation();
  @ViewChild('addLocationMap') mapElement: ElementRef;
  addLocationMap: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    private formBuilder: FormBuilder,
    public modalCtrl: ModalController,
    private locService: LocationService) {

    this.addLocationFormGroup = this.formBuilder.group({
      locationname: ['', Validators.required],
      address: ['please wait...', Validators.required]
    });
  }

  ngOnInit() {
    this.setCurrentLocation();
  }

  saveLocation() {
    this.storage.get("places").then((places) => {
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



  setCurrentLocation() {

    var ctx = this;
    this.locService.getCurrentPlineLocation().then((currentLoc) => {
      let latLng = new google.maps.LatLng(currentLoc.latitude, currentLoc.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.addLocationMap = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      ctx.addLocationFormGroup.controls['address'].setValue(currentLoc.address);
    });

  }

}
