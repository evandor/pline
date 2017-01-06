import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SocialSharing } from 'ionic-native';
import firebase from 'firebase';


@Injectable()
export class InvitationService {

  
  public inviteeEmail: any;
  public userProfileRef: any;
  public currentUserRef: any;
  public followersRef: any;
  user: any;

  constructor() {
    this.user = firebase.auth().currentUser;
    this.userProfileRef = firebase.database().ref('/userProfile');
    this.currentUserRef = this.userProfileRef.child(this.user.uid);
    this.followersRef = this.currentUserRef.child('followers');
  }




  sendInvitation(email: string): any {
    this.inviteeEmail = email;
    var subject = "Follow me on pline!";
    var invitationLink = "pline://pages/review-invitation?e1="+this.user.email+"&e2=" + this.inviteeEmail;
    var message = "Hey, <br>this app can help us keep up with each other!<br> Use this <a href='" + invitationLink + "'>"+invitationLink+"</a> to accept the invitation";

    // Share via email
    return SocialSharing.shareViaEmail(message, subject, this.inviteeEmail).then(() => {
      this.saveFollower();
      return "success";


    }).catch(() => {
      return "failed";
    });

  }

  saveFollower() {

    var newFollowerRef = this.followersRef.push();
    newFollowerRef.set({
      'invitationEmail': this.inviteeEmail,
      'invitationDate':new Date().getDate
     
    });

  }

}
