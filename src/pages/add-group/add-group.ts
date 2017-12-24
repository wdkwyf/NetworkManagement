import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the AddGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-group',
  templateUrl: 'add-group.html',
})
export class AddGroupPage {

  groupList;

  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddGroupPage');
  }

  ionViewWillLoad(){
    this.groupList = [{name:"同事"},{name:"同学"}];

  }

  conformBtnClicked(){
    this.navCtrl.pop();
  }

  createGroup(){
      let prompt = this.alertCtrl.create({
        title: '新建分组',
        message: "请输入分组名",
        inputs: [
          {
            name: 'groupName',
            placeholder: 'GroupName'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: data => {
              console.log(data.groupName);
              console.log('Saved clicked');
              //todo 存数据库
            }
          }
        ]
      });
      prompt.present();


  }




}
