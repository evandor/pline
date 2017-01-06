import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InvitationService } from '../../providers/invitation-service';


@Component({
  selector: 'page-review-invitation',
  templateUrl: 'review-invitation.html'
})
export class ReviewInvitationPage {

  hostEmail:string;
  inviteeEmail:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public _invitationService: InvitationService) {

    this.hostEmail=navParams.get('e1');
    this.inviteeEmail=navParams.get('e2');
    
  }

  acceptInvitation(){}
  declineInvitation(){
    //the pending invitation has to be deleted from firebase
  }

}
