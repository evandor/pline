import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { InvitationService } from '../../providers/invitation-service';
import { ContactsPage } from '../contacts/contacts';


@Component({
  selector: 'page-review-invitation',
  templateUrl: 'review-invitation.html'
})
export class ReviewInvitationPage {

  hostUID:string;
  hostName:string;
  hostEmail:string;
  followerUID:string;

  
 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public _invitationService: InvitationService) {

    this.hostUID=navParams.get('uid');
    this.followerUID=navParams.get('key');
   

    this._invitationService.getUserProfile(this.hostUID).then((result) => {
      this.hostName=result.name; 
      this.hostEmail=result.email; 
    }); 
    
  }


  acceptInvitation(){
   this._invitationService.setFollower(this.hostUID, this.followerUID);
   this.navCtrl.push(ContactsPage);
  }
  declineInvitation(){
    //the pending invitation has to be deleted from firebase
  }

  showAcceptedAlert() {
    let alert = this.alertCtrl.create({
      subTitle: "You are following"+this.hostName+"now!",
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
