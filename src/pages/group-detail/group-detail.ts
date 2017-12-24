import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {GroupServiceProvider} from "../../providers/group-service/group-service";

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
  groupId;

  constructor(private groupService:GroupServiceProvider,private app:App,public navCtrl: NavController, public navParams: NavParams) {
    this.groupId = navParams.get('groupId');
    groupService.getContactsInGroup(this.groupId).subscribe(contacts=>{
      console.log(contacts);
      this.contactsList = contacts;
    });//[{id:'3',name:'haha',avatar:'./assets/imgs/user.jpg'},{id:'4',name:'hhh',avatar:'./assets/imgs/avatar.jpg'},{id:'5',name:'haha',avatar:'./assets/imgs/to-user.jpg'}]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupDetailPage');
  }

  contactTapped(username){
    console.log('contact');
    this.app.getRootNav().push('PersonalInfoPage',{'username':username});

  }

}
