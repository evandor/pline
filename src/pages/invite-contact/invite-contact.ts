import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { InvitationService } from '../../providers/invitation-service';
import { AuthService } from '../../providers/auth-service';


@Component({
  selector: 'page-invite-contact',
  templateUrl: 'invite-contact.html'
})
export class InviteContactPage {

  inviteFormGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public _invitationService: InvitationService,
    public _authService: AuthService) {

    this.inviteFormGroup = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
    });

    
  }

  
  
  inviteContact() { 
      this._invitationService.sendInvitation(this.inviteFormGroup.value.email).then(() => {
        this.showInvitationSentAlert();
        this.navCtrl.pop();
      }, (error) => {
        alert("send failed");
      });
    

  }

  showInvitationSentAlert() {
    let alert = this.alertCtrl.create({
      subTitle: "Great, your invite has been sent.<br>Enjoy using pline!",
      buttons: [
        {
          text: "Great!",
          handler: () => {
            console.log('OK clicked');
          }
        }]

    });
    alert.present();
  }
  
  showConfirmationAlert() {
    let alert = this.alertCtrl.create({
      subTitle: "Great, just click the email link we've sent you",
      buttons: [
        {
          text: "OK",
          handler: () => {
            console.log('OK clicked');
          }
        }]

    });
    alert.present();
  }

}
