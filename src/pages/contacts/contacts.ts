import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../domain/user';
import { Storage } from '@ionic/storage';
import { InviteContactPage } from '../invite-contact/invite-contact';


@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {

  contacts: Array<User> = new Array();

  constructor(public navCtrl: NavController, public storage: Storage) {}

  ionViewDidEnter(){
      this.storage.get('users_local').then((result) => {
      this.contacts = result;
    });
    
  }

   public contactsEmpty() {
    return this.contacts.length <= 1; // the first entry is the self-user set in sign-up page
  }

  openInviteContactPage(){
    this.navCtrl.push(InviteContactPage);
  }

}
