import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {AppConfig} from "../../app/app.config";

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

  constructor(private authService:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    authService.getUserInfoByName(AppConfig.getUsername()).subscribe(data=>{
      this.userInfo = data;
      this.groupLists = this.userInfo.hasgroup;
    })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupListPage');
  }

  showGroupDetails(groupId){
    this.navCtrl.push("GroupDetailPage",{'groupId':groupId});
  }

}
