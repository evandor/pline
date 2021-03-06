import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase';


@Injectable()
export class AuthService {

  public fireAuth: any;
  public userProfileRef: any;


  constructor() {
    this.fireAuth = firebase.auth(); // We are creating an auth reference.
    // This declares a database reference for the userProfile/ node.
    this.userProfileRef = firebase.database().ref('/userProfile');

  }

  /**
   * [loginUser We'll take an email and password and log the user into the firebase app]
   * @param  {string} email    [User's email address]
   * @param  {string} password [User's password]
   */
  loginUser(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  /**
   * [signupUser description]
   * This function will take the user's email and password and create a new account on the Firebase app, once it does
   * it's going to log the user in and create a node on userProfile/uid with the user's email address, you can use
   * that node to store the profile information.
   * @param  {string} email    [User's email address]
   * @param  {string} password [User's password]
   */
  signupUser(name: string, email: string, password: string): any {

    return this.fireAuth.createUserWithEmailAndPassword(email, password).then((newUser) => {

      newUser.updateProfile({
        displayName: name
      }).then(function () {
        newUser.sendEmailVerification();
      }, function (error) {
      });

      this.userProfileRef.child(newUser.uid).set({
        email: email,
        name: name
      });



    });
  }

  confirmAccount(): any {
 
    return this.fireAuth.currentUser.sendEmailVerification();
  }

  /**
   * [resetPassword description]
   * This function will take the user's email address and send a password reset link, then Firebase will handle the
   * email reset part, you won't have to do anything else.
   *
   * @param  {string} email    [User's email address]
   */
  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  /**
   * This function doesn't take any params, it just logs the current user out of the app.
   */
  logoutUser(): any {
    return this.fireAuth.signOut();
  }

  confirmedUser(): any {
    return this.fireAuth.currentUser.emailVerified;
  }

 /**
  * Needed for user status update (registered or confirmed user) 
 e.g. if user switches from Pline-App to Email-Account to confirm his email an returns back to app
 firebase will not automatically pass this information
 */
  reloadUser():any{
      return this.fireAuth.currentUser.reload();
  }

}