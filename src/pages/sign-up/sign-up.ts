import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { User } from '../../domain/user';
import { Camera } from 'ionic-native';
import { HomePage } from '../home/home';
import { UUID } from 'angular2-uuid';
import { EmailValidator } from '../../validators/email';

import firebase from 'firebase';



@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {

  users:any;
  registerFormGroup: FormGroup;
  profilePictureRef: any;
  user = new User();
  users_local: Array<User> = new Array();

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController, ) {

    this.users = firebase.database().ref('/someFolder/');
    //angFire.database.list('/users');
    //this.profilePictureRef = firebase.storage().ref('/userProfilePics/');


    this.registerFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

  }

  register() {

    this.user.id = UUID.UUID();
    this.user.name = this.registerFormGroup.value.name;
    this.user.email = this.registerFormGroup.value.email;
    this.user.password = this.registerFormGroup.value.password;
    this.user.self = true;
    this.user.status = 0;

    //this stores user to local storage
    this.users_local.push(this.user);
    this.storage.set("users_local", this.users_local);

    //this creates user in firebase auth
    firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.name;
      var errorMessage = error.message;
 
      // ...
    });

    //this stores user to firebase
    this.users.push({
      id: this.user.id, name: this.user.name, email: this.user.email, status: this.user.status
    });

    /*if (this.user.profilePicture != null) {
       this.profilePictureRef.child(this.user.userEmail).child('profilePicture.png')
         .putString(this.user.profilePicture, 'base64', { contentType: 'image/png' })
         .then((savedPicture) => {
           console.log("This is the image URL " + savedPicture.downloadURL);
         });
     }*/

    this.showConfirmationAlert();
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
      this.user.profilePicture = result;

    }, (_error) => {
      alert('Mira meldet Error ' + _error.message);
    });
  }

}
