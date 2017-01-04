import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InvitationService } from '../../providers/invitation-service';


@Component({
  selector: 'page-review-invitation',
  templateUrl: 'review-invitation.html'
})
export class ReviewInvitationPage {

  email:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public _invitationService: InvitationService) {

    this.email=navParams.get('email');
    
  }

  acceptInvitation(){}
  declineInvitation(){
    //the pending invitation has to be deleted from firebase
  }

}
