import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the GroupDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-detail',
  templateUrl: 'group-detail.html',
})
export class GroupDetailPage {

  contactsList:any[];

  constructor(private app:App,public navCtrl: NavController, public navParams: NavParams) {
    this.contactsList = [{id:'3',name:'haha',avatar:'./assets/imgs/user.jpg'},{id:'4',name:'hhh',avatar:'./assets/imgs/avatar.jpg'},{id:'5',name:'haha',avatar:'./assets/imgs/to-user.jpg'}]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupDetailPage');
  }

  contactTapped(contact){
    console.log('contact');
    this.app.getRootNav().push('PersonalInfoPage',contact);

  }

}
