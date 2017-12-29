import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {AppConfig} from "../../app/app.config";
import {GroupServiceProvider} from "../../providers/group-service/group-service";

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

  constructor(private groupService:GroupServiceProvider,private alertCtrl:AlertController,private authService:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    authService.getUserInfoByName(AppConfig.getUsername()).subscribe(data=>{
      this.userInfo = data;
      this.groupLists = this.userInfo.hasgroup;
    })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupListPage');
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
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '创建',
          handler: data => {
            console.log(data.groupName);
            console.log('Saved clicked');
            //todo 存数据库
            this.groupService.createGroup(this.userInfo,data.groupName).subscribe(groupList=>{
              console.log(groupList);
              if(groupList.length>0){
                alert("创建成功");
                this.groupLists = groupList;
              }
            })
          }
        }
      ]
    });
    prompt.present();


  }

  showGroupDetails(groupId){
    this.navCtrl.push("GroupDetailPage",{'groupId':groupId});
  }

}
