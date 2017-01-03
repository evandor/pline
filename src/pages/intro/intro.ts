import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {

  constructor(public navCtrl: NavController) {}

  agreed() {
    this.navCtrl.push(SignUpPage);
  }

   login(){
      this.navCtrl.push(LoginPage);
   }

}
