import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SocialSharing } from 'ionic-native';
import firebase from 'firebase';


@Injectable()
export class InvitationService {


  public inviteeEmail: any;
  public userProfileRef: any;
  public currentUserRef: any;
  public hostUserRef: any;
  public followersRef: any;
  public hostFollowersRef: any;
  currentUser: any;
 

  constructor() {
    this.currentUser = firebase.auth().currentUser;
    this.userProfileRef = firebase.database().ref('/userProfile');
    this.currentUserRef = this.userProfileRef.child(this.currentUser.uid);
    this.followersRef = this.currentUserRef.child('followers');
  }

  sendInvitation(email: string): any {
    this.inviteeEmail = email;
    var key= this.saveInvitation();
    //console.log("Key is ", key);
    var subject = "Follow me on pline!";
    var invitationLink = "pline://pages/review-invitation?uid=" + this.currentUser.uid +"&key="+key;
    var message = "Hey, <br>this app can help us keep up with each other!<br> Use this <a href='" + invitationLink + "'>" + invitationLink + "</a> to accept the invitation";

    // Share via email
    return SocialSharing.shareViaEmail(message, subject, this.inviteeEmail).then(() => {
      
      return "success";


    }).catch(() => {
      return "failed";
    });

  }

  saveInvitation():any {
    var newFollowerRef = this.followersRef.push();
    newFollowerRef.set({
      'invitationEmail': this.inviteeEmail,
      'invitationDate': Math.round(new Date().getTime() / 1000)

    });

    return newFollowerRef.key;
  }


  getUserProfile(userUID: string): any {
    return firebase.database().ref('/userProfile/' + userUID).once('value').then(function (snapshot) {
      return snapshot.val();
    });

  }


  setFollower(hostUID: string, followerUID:string){
    this.hostUserRef = this.userProfileRef.child(hostUID);
    this.hostFollowersRef = this.hostUserRef.child('followers');
    var hostFollowerRef= this.hostFollowersRef.child(followerUID);
    hostFollowerRef.update({
      'followerUID': this.currentUser.uid
    })


  }



}
