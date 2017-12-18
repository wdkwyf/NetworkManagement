import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ContactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {

  contactsList = [{id:'2',name:'haha',avatar:'./assets/imgs/to-user.jpg'},{id:'3',name:'hhh',avatar:'./assets/imgs/to-user.jpg'},{id:'4',name:'haha',avatar:'./assets/imgs/to-user.jpg'}]

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
  }

  addContact(){
    console.log("添加人脉");
  }

}
