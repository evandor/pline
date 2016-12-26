import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { User } from '../../domain/user';
import { Camera } from 'ionic-native';
import { HomePage } from '../home/home';
import { UUID } from 'angular2-uuid';



@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {

  users: FirebaseListObservable<any>;
  registerFormGroup: FormGroup;
  profilePictureRef: any;
  user = new User();
  users_local: Array<User> = new Array();

  constructor(
    public navCtrl: NavController, 
    angFire: AngularFire,
    public storage: Storage,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,) {

      this.users = angFire.database.list('/users');
      //this.profilePictureRef = firebase.storage().ref('/userProfilePics/');


      this.registerFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    });

    }

  register(){

    this.user.id = UUID.UUID();
    this.user.name = this.registerFormGroup.value.name;
    this.user.email = this.registerFormGroup.value.email;
    this.user.self = true;
    this.user.status = 0;

    //this stores user to local storage
        this.users_local.push(this.user);
        this.storage.set("users_local", this.users_local); 

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

    //this is set to show proper root page on next start via app.component.ts
    this.storage.set("introShown", true);
    this.showConfirmationAlert();
  }

  showConfirmationAlert(){

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

  getProfilePicture(){

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
