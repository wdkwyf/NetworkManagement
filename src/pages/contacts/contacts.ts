import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ChatPage} from "../chat/chat";

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

  contactsList; //= [{id:'3',name:'haha',avatar:'./assets/imgs/to-user.jpg'},{id:'4',name:'hhh',avatar:'./assets/imgs/to-user.jpg'},{id:'5',name:'haha',avatar:'./assets/imgs/to-user.jpg'}]

  constructor(private app:App,public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();
  }

  initializeItems() {
    this.contactsList = [{id:'3',name:'haha',avatar:'./assets/imgs/user.jpg'},{id:'4',name:'hhh',avatar:'./assets/imgs/avatar.jpg'},{id:'5',name:'haha',avatar:'./assets/imgs/to-user.jpg'}]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
  }

  addContact(){
    console.log("添加人脉");
  }

  contactTapped(contact){
    console.log('contact');
    //todo 新建笔
    this.app.getRootNav().push('PersonalInfoPage',contact);

  }

  addGroup(){
    console.log("addGroupClicked");
    this.app.getRootNav().push('AddGroupPage');
  }

  imgTapped(){
    console.log('imgTapped');
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.contactsList = this.contactsList.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
