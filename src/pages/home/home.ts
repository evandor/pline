import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Message } from '../../domain/message';
import { PlineLocation } from '../../domain/pline-location';
import { User } from '../../domain/user';

import { AddLocationPage } from '../add-location/add-location';
import { LocationsPage } from '../locations/locations';

import { InviteContactPage } from '../invite-contact/invite-contact';
import { ContactsPage } from '../contacts/contacts';

import { TrackingService } from '../../providers/tracking-service';
import { LocationService } from '../../providers/location-service';
import { AuthService } from '../../providers/auth-service';


import * as moment from 'moment';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [TrackingService]
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
    public alertCtrl: AlertController,
    public storage: Storage,
    private _trackingService: TrackingService,
    private _locationService: LocationService,
    public _authService: AuthService) {

    storage.get('places').then((result) => {
      if (result == null) {
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
        locationA.name = "office";
        message1.user = user1;
        message1.timeStamp = 1480586400;
        message1.messageType = 0;
        message1.location = locationA;
        this.messages.push(message1);

        var message2: Message = new Message();
        var user2: User = new User("Linus", "linus@pline.one");
        var locationB: PlineLocation = new PlineLocation();
        locationB.name = "home";

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

    _trackingService.register(storage, ctx._locationService).subscribe(
      function (messagePromise: Promise<Message>) {
        messagePromise.then((msg) => {
          console.log(msg);
          ctx.messages.push(msg);
        }).catch((error) => {
          console.log('onError: %s', error);
        });
      },
      function (e) {
        console.log('onError: %s', e);
      },
      function () {
        console.log('onCompleted');
      }
    );

  }

  ngOnInit() {
    this.loadMap();
  }

  openAddLocationPage() {
    this.navCtrl.push(AddLocationPage);
  }

  openLocationsPage() {
    this.navCtrl.push(LocationsPage);
  }

  openInviteContactPage() {
    var ctx=this;
    this._authService.reloadUser().then(() => {
      if (ctx.accountConfirmed()) {
        ctx.navCtrl.push(InviteContactPage);
      }
      else {
        ctx.showVerifyAccountAlert();
      }

    });
  }

  accountConfirmed() {
    return this._authService.confirmedUser();
  }

  openContactsPage() {
    this.navCtrl.push(ContactsPage);
  }

  public messagesEmpty() {
    return this.messages.length == 0;

  }



  loadMap() {
    //test-data for now; later a map with pins for all contact's last check-ins should be shown
    let latLng = new google.maps.LatLng(47.8693807, 12.646161);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.maphome = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }

  showVerifyAccountAlert() {
    let alert = this.alertCtrl.create({
      subTitle: "Please confirm your email first!",
      buttons: [
        {
          text: "Resend email",
          handler: () => {
            this._authService.confirmAccount;
          }
        }]
    });
    alert.present();
  }

}
