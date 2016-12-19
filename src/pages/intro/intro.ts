import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';


@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {

  constructor(public navCtrl: NavController) {}

  agreed() {
    this.navCtrl.push(SignUpPage);
  }

}
