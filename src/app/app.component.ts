import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { IntroPage } from '../pages/intro/intro';


import firebase from 'firebase';

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

  constructor(platform: Platform) {

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
  };
}
