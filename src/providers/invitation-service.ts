import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SocialSharing } from 'ionic-native';
import firebase from 'firebase';


@Injectable()
export class InvitationService {

  recipientEmail: any;
  public userProfile: any;

  constructor() {
    this.userProfile = firebase.database().ref('/userProfile');
  }


  
  
  sendInvitation(email: string): any {
    this.recipientEmail = email;
    console.log ("Inside sendInvitation, recipientEmail is..." +this.recipientEmail);
    var subject = "Follow me on pline!";
    var invitationLink = "pline://pages/review-invitation?email=" + this.recipientEmail;
    var message = "Hey, <br>this app can help us keep up with each other!<br> Use this <a href='" + invitationLink + "'>link</a> to accept the invitation";
    console.log ("Inside sendInvitation, message is..."+ message);
    // Share via email
    return SocialSharing.shareViaEmail(message, subject, this.recipientEmail).then(() => {
      this.saveInvitee();
      return "success";


    }).catch(() => {
      return "failed";
    });

  }

  saveInvitee() {

    var user = firebase.auth().currentUser;
    console.log ("Inside saveInvitee, current user is... "+user.uid);

    if (user) {

      this.userProfile.child(user.uid).update({
        recipientEmail:this.recipientEmail
      });
      
    } else {
      // No user is signed in.
    }


  }


}
