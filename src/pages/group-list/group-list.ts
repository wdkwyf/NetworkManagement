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
  groupLists = [{"name":"同事","count":20},{"name":"同学","count":30}];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupListPage');
  }

  showGroupDetails(){
    this.navCtrl.push("GroupDetailPage");
  }

}
