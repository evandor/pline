import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../domain/user';
import { Camera } from 'ionic-native';
import { HomePage } from '../home/home';
import { EmailValidator } from '../../validators/email';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {

  registerFormGroup: FormGroup;
  profilePicture: any;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  constructor(
    public navCtrl: NavController,
    public _authService: AuthService,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

    this.registerFormGroup = this.formBuilder.group({
      name: ['Izzy Divine', Validators.required],
      email: ['mira.v.graef@gmail.com', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['izzylinus', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  /**
   * Receives an input field and sets the corresponding fieldChanged property to 'true' to help with the styles.
   */
  elementChanged(input) {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  /**
   * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
   *  component while the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */
  signupUser() {
    this.submitAttempt = true;

    if (!this.registerFormGroup.valid) {
      console.log(this.registerFormGroup.value);
    } else {
      this._authService.signupUser(this.registerFormGroup.value.name, this.registerFormGroup.value.email, this.registerFormGroup.value.password).then(() => {
        this.showConfirmationAlert();
      }, (error) => {
        this.loading.dismiss().then(() => {
          var errorMessage: string = error.message;
          let alert = this.alertCtrl.create({
            message: errorMessage,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
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
