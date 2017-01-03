import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IntroPage } from '../pages/intro/intro';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { HomePage } from '../pages/home/home';
import { LocationsPage } from '../pages/locations/locations';
import { AddLocationPage } from '../pages/add-location/add-location';
import { SearchLocationModalPage } from '../pages/search-location-modal/search-location-modal';
import { ContactsPage } from '../pages/contacts/contacts';
import { InviteContactPage } from '../pages/invite-contact/invite-contact';
import { LoginPage } from '../pages/login/login';

import { Storage } from '@ionic/storage';
import { LocationService } from '../providers/location-service';
import {TimestampPipe} from '../pipes/timestamp-pipe';


@NgModule({
  declarations: [
    MyApp,
    IntroPage,
    SignUpPage,
    HomePage,
    LocationsPage,
    AddLocationPage,
    SearchLocationModalPage,
    ContactsPage,
    InviteContactPage,
    TimestampPipe,
    LoginPage

  ],
  imports: [
    IonicModule.forRoot(MyApp)
     
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IntroPage,
    SignUpPage,
    HomePage,
    LocationsPage,
    AddLocationPage,
    SearchLocationModalPage,
    ContactsPage,
    InviteContactPage,
    LoginPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage, LocationService]
})
export class AppModule {}
