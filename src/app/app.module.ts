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

import { Storage } from '@ionic/storage';
import {TimestampPipe} from '../pipes/timestamp-pipe';
// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
// AF2 Settings

export const firebaseConfig = {
  apiKey: "AIzaSyDICkKdSMNgbcMfxYgJVYVsGN8Qb1XFWZk",
  authDomain: "pline-145318.firebaseapp.com",
  databaseURL: "https://pline-145318.firebaseio.com",
  storageBucket: "pline-145318.appspot.com",
  messagingSenderId: "1025531799456"
};

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
    TimestampPipe

  ],
  imports: [
    IonicModule.forRoot(MyApp),
     AngularFireModule.initializeApp(firebaseConfig)
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
    InviteContactPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage]
})
export class AppModule {}
