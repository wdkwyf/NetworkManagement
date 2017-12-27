import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GroupListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-list',
  templateUrl: 'group-list.html',
})
export class GroupListPage {
  userInfo;
  groupLists;// = [{"name":"同事","count":20},{"name":"同学","count":30}];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userInfo = navParams.get('userInfo');
    this.groupLists = this.userInfo.hasgroup;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupListPage');
  }

  showGroupDetails(groupId){
    this.navCtrl.push("GroupDetailPage",{'groupId':groupId});
  }

}
