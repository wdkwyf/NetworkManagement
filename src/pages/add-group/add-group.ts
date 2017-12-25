import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {GroupServiceProvider} from "../../providers/group-service/group-service";
import {AppConfig} from "../../app/app.config";

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
  groups;
  contactName;
  userInfo;
  inGroupIdList;
  personalInfoPage;

  constructor(private groupService:GroupServiceProvider,private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
    this.contactName = navParams.get('contactName');
    this.userInfo = AppConfig.getUserInfo();
    this.inGroupIdList = navParams.get('inGroupsId');
    this.groupList = this.userInfo.hasGroups;
    this.personalInfoPage = navParams.get('personalInfoPage');
    for(let group of this.groupList){
      group.checked = this.inGroupIdList.indexOf(group.id)>-1;
    }

    console.log('navParam---contactName'+this.contactName);
    console.log('navParam---inGroupsId'+this.inGroupIdList);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddGroupPage');

  }

  ionViewWillLoad(){
    // this.groupList = this.userInfo.hasGroups;

  }

  conformBtnClicked(){
    // this.navCtrl.pop();
    // this.callback(this.groupList);
    // this.navCtrl.pop();

    let inGroupIdList = [];
    let groupStr = "";
    for(let group of this.groupList){
      if(group.checked){
        groupStr += group.name+" ";
        inGroupIdList.push(group.id);
      }
    }
    if(this.personalInfoPage){
      this.personalInfoPage.inGroup = groupStr;
    }
    this.groupService.modifyInGroupList(inGroupIdList,this.contactName);
    this.navCtrl.pop();

    // this.callback(groupStr).then((data)=>{ console.log(data);this.navCtrl.pop() });
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
              this.groupService.createGroup(this.userInfo,data.groupName).subscribe(success=>{
                if(success){
                  alert("创建成功");
                }
              })
            }
          }
        ]
      });
      prompt.present();


  }




}
