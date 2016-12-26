
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LocationService } from '../../providers/location-service';
import { PlineLocation } from '../../domain/pline-location';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SearchLocationModalPage } from '../search-location-modal/search-location-modal';
import { UUID } from 'angular2-uuid';

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
  latLng: any;

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
      this.location.id= UUID.UUID();
      places.push(this.location);
      this.storage.set("places", places);
      this.navCtrl.pop();
    });
  }

  openSearchLocationModal() {
    let modal = this.modalCtrl.create(SearchLocationModalPage);
    modal.onDidDismiss(searchResult => {

      if (searchResult) {
        this.location.address = searchResult.formatted_address;
        this.location.latitude = searchResult.geometry.location.lat();
        this.location.longitude = searchResult.geometry.location.lng();
        this.addLocationFormGroup.controls['address'].setValue(this.location.address);
        this.latLng = searchResult.geometry.location;
        this.addLocationMap.setCenter(this.latLng);
        this.createMapMaker(searchResult);

      }
    });
    modal.present();
  }



  setCurrentLocation() {

    var ctx = this;
    this.locService.getCurrentPlineLocation().then((currentLoc) => {
      ctx.latLng = new google.maps.LatLng(currentLoc.latitude, currentLoc.longitude);

      let mapOptions = {
        center: ctx.latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.addLocationMap = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      ctx.addLocationFormGroup.controls['address'].setValue(currentLoc.address);

      //add a marker to the map
      let marker = new google.maps.Marker({
        map: this.addLocationMap,
        animation: google.maps.Animation.DROP,
        position: this.addLocationMap.getCenter()
      });
      //show current address when user taps marker
      let infoWindow = new google.maps.InfoWindow({
        content: currentLoc.address
      });
      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.addLocationMap, marker);
      });

    });

  }

  createMapMaker(place: any): void {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: this.addLocationMap,
      position: placeLoc
    });

  }



}
