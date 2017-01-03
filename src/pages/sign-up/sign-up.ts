import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../domain/user';
import { Camera } from 'ionic-native';
import { HomePage } from '../home/home';
import { EmailValidator } from '../../validators/email';
import firebase from 'firebase';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {

  registerFormGroup: FormGroup;
  profilePicture:any;

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController, ) {

    this.registerFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

  }

  register() {    
    var ctx=this;
    //this creates user in firebase auth
    firebase.auth().createUserWithEmailAndPassword(ctx.registerFormGroup.value.email,ctx.registerFormGroup.value.password)
      .then((user) => {
        user.updateProfile({
          displayName: ctx.registerFormGroup.value.name,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function () {
        }, function (error) {
        });
        user.sendEmailVerification().then(function () {
           ctx.showConfirmationAlert();
        }, function (error) {
          // An error happened.
        });
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.name;
        var errorMessage = error.message;

        // ...
      });   
  }

  showConfirmationAlert() {
    let alert = this.alertCtrl.create({
      title: "Please confirm it's you",
      subTitle: "Just click the email link we've sent you",
      buttons: [
        {
          text: "OK",
          handler: () => {
            console.log('OK clicked');
            this.navCtrl.setRoot(HomePage);
          }
        }]

    });
    alert.present();
  }

  getProfilePicture() {

    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.PNG,
      targetHeight: 640,
      correctOrientation: true
    }).then((result) => {
      this.profilePicture = result;

    }, (_error) => {
      alert('Mira meldet Error ' + _error.message);
    });
  }

}
