import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../domain/user';
import { InviteContactPage } from '../invite-contact/invite-contact';
import { UserService } from '../../providers/user-service';


@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {

  contacts: Array<User> = new Array();

  constructor(
    public navCtrl: NavController, 
    public _userService: UserService) {


   this._userService.getFollowers();

  }

 

   public contactsEmpty() {
    return true;
  }

  openInviteContactPage(){
    this.navCtrl.push(InviteContactPage);
  }

}
