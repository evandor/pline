import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { User } from '../domain/user';


@Injectable()
export class UserService {

  user:User=new User();

  constructor(public http: Http) {
    
  }

  getCurrentUserUID():any{
   return firebase.auth().currentUser.uid;
  }

  getUserProfile(userUID: string): any {
    return firebase.database().ref('/userProfile/' + userUID).once('value').then(function (snapshot) {
      return snapshot.val();
    });
  }

  getFollowers() {
    return firebase.database().ref('/userProfile/' + this.getCurrentUserUID()+ '/followers/').once('value').then(function (snapshot) {
         //var i = 0;
          snapshot.forEach(function(result){
          //console.log("The key of the user IS...",this.user.uid=result.key);
           //console.log('user %s is in position %d with %d points', result.key, i++, result.val());
           var key=result.key;
          
           console.log("Hier Key und Value: ", key);

         });
  });
  }


}
