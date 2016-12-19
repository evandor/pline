import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { IntroPage } from '../pages/intro/intro';
import { Storage } from '@ionic/storage';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = IntroPage;

  constructor(platform: Platform, public storage: Storage) {
    platform.ready().then(() => {
      
      
      // IntroPage should be the rootPage only at first launch of the app, afterwords TabsPage is set as rootPage.
      //For development reasons the "remove"-toggle is set in if-clause     
      this.storage.get('introShown').then((result) => {

        if (result) {
          this.storage.remove ('introShown');
          this.rootPage = HomePage;
        } else {
          this.rootPage = IntroPage;
        };

        StatusBar.styleDefault();
        Splashscreen.hide();

      });




    });
  }
}
