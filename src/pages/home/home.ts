import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Message } from '../../domain/message';
import { PlineLocation } from '../../domain/pline-location';
import { User } from '../../domain/user';

import { AddLocationPage } from '../add-location/add-location';

import { TrackingService } from '../../providers/tracking-service';
import { LocationService } from '../../providers/location-service';

import { ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [TrackingService, LocationService]
})
export class HomePage {

  messages: Array<Message> = new Array();
  places: Array<PlineLocation> = new Array();
  testLocation1: PlineLocation = new PlineLocation();
  testLocation2: PlineLocation = new PlineLocation();
  @ViewChild('maphome') mapElement: ElementRef;
  maphome: any;

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    private _trackingService: TrackingService,
    private _locationService: LocationService) {

    storage.get('places').then((result) => {
      if (result == null) {
        //test-data START
        this.testLocation1.placeName = "HorseTestLocation New";
        this.testLocation1.latitude = 48.1433036;
        this.testLocation1.longitude = 11.6552563;
        this.testLocation1.address = "Trabrennbahn München-Daglfing, Rennbahnstraße, München";
        this.places.push(this.testLocation1);

        this.testLocation2.placeName = "BeerTestLocation New";
        this.testLocation2.latitude = 47.8701866;
        this.testLocation2.longitude = 12.6462623;
        this.testLocation2.address = "Brauerei-Ausschank Schnitzlbaumer, Taubenmarkt, Traunstein";
        this.places.push(this.testLocation2);
        //test-data END
        storage.set("places", this.places);
      }
    });

    storage.remove('messages');
    storage.get('messages').then((result) => {
      if (result == null) {

        //test-data START
        var message1: Message = new Message();
        var user1: User = new User("Izzy", "izzy@pline.one");
        var locationA: PlineLocation = new PlineLocation();
        locationA.placeName = "office";
        message1.user = user1;
        message1.timeStamp = 1480586400;
        message1.messageType = 0;
        message1.location = locationA;
        this.messages.push(message1);

        var message2: Message = new Message();
        var user2: User = new User("Linus", "linus@pline.one"); 
        var locationB: PlineLocation = new PlineLocation();
        locationB.placeName = "home";

        message2.user = user2;
        message2.timeStamp = 1480838400;
        message2.messageType = 1;
        message2.location = locationB;
        this.messages.push(message2);

        storage.set('messages', this.messages);

      } else {
        this.messages = result;
        storage.remove('messages');


      }

    });

    var ctx = this;

    /*_trackingService.register(storage, ctx._locationService).subscribe(
      function (messagePromise: Promise<Message>) { 
        messagePromise.then((msg) => {
          console.log(msg);
        });
      },
      function (e) { console.log('onError: %s', e); },
      function () {
        console.log('onCompleted');
      }
    );*/
    
  }

  openAddLocationPage(){
    this.navCtrl.push(AddLocationPage);
  }
  
  public messagesEmpty() {
    return this.messages.length == 0;

  }

  ngOnInit() {

    this.loadMap();

  }

  loadMap() {
    //test-data for now; later a map with all contact's last check-ins should be shown
    let latLng = new google.maps.LatLng(47.8693807, 12.646161);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.maphome = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }

}
