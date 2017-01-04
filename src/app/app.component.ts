import { Component } from '@angular/core';
import { Platform, Nav, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen, Deeplinks } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { IntroPage } from '../pages/intro/intro';
import { ReviewInvitationPage } from '../pages/review-invitation/review-invitation';


import firebase from 'firebase';
import {ViewChild} from '@angular/core';

export const firebaseConfig = {
  apiKey: "AIzaSyDICkKdSMNgbcMfxYgJVYVsGN8Qb1XFWZk",
  authDomain: "pline-145318.firebaseapp.com",
  databaseURL: "https://pline-145318.firebaseio.com",
  storageBucket: "pline-145318.appspot.com",
  messagingSenderId: "1025531799456"
};


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  
   @ViewChild(Nav) navChild:Nav;

  constructor(private platform: Platform) {

    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.rootPage = IntroPage;
        console.log("There's not a logged in user!");
      }
    });
      platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  
  ngAfterViewInit() {
      this.platform.ready().then(() => {
      Deeplinks.routeWithNavController(this.navChild, {
        '/review-invitation': ReviewInvitationPage
      }).subscribe((match) => {
        
         var args=match.$args;
         var link=match.$link;
        console.log('Successfully routed', match);
      }, (nomatch) => {
        console.warn('Unmatched Route', nomatch);
      });
    })
}
}
