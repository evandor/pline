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
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { ReviewInvitationPage } from '../pages/review-invitation/review-invitation';

import { Storage } from '@ionic/storage';
import { LocationService } from '../providers/location-service';
import { AuthService } from '../providers/auth-service';
import { InvitationService } from '../providers/invitation-service';
import { UserService } from '../providers/user-service';
import {TimestampPipe} from '../pipes/timestamp-pipe';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '113b8df6'
  },
  'push': {
    'sender_id': '1025531799456',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
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
    TimestampPipe,
    LoginPage,
    ResetPasswordPage,
    ReviewInvitationPage

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)     
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
    LoginPage,
    ResetPasswordPage,
    ReviewInvitationPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    Storage, 
    LocationService, 
    AuthService, 
    InvitationService, 
    UserService]
})
export class AppModule {}
