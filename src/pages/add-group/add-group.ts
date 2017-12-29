import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {GroupServiceProvider} from "../../providers/group-service/group-service";
import {AppConfig} from "../../app/app.config";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

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

  userInfo;
  personalInfoPage;
  personalUserInfo;
  inGroups;
  inGroupIdList=[];//好友所在的所有group的id
  groupList=[];//用户建的所有组
  joinGroups;//好友所在的所有group对应的Ingroup


  constructor(private authService:AuthServiceProvider,private groupService:GroupServiceProvider,private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
    this.personalUserInfo = navParams.get('personalUser');
    this.personalInfoPage = navParams.get('personalInfoPage');
    authService.getUserInfoByName(AppConfig.getUsername()).subscribe(data=>{
      this.userInfo = data;
      this.groupList = this.userInfo.hasgroup;
      this.updateIngroups();
    });

  }

  updateIngroups(){
    this.groupService.getInGroupOfUser(this.personalUserInfo['include']['name']).subscribe(inGroups=>{

        let hasGroupIds = [];
        for(let hasGroup of this.groupList){
          hasGroupIds.push(hasGroup.id);
        }
        this.inGroups = inGroups['groups'].filter(item=>{
          return(hasGroupIds.indexOf(item.id)>-1);
        });
        this.joinGroups = inGroups['joinGroups'];
        this.joinGroups = this.joinGroups.filter(item=>{
          return(hasGroupIds.indexOf(item.group.id)>-1);
        });
        for (let group of this.inGroups) {
          this.inGroupIdList.push(group['id']);
        }
        for(let group of this.groupList){
          group.checked = this.inGroupIdList.indexOf(group.id)>-1;
        }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddGroupPage');

  }

  conformBtnClicked(){
    let newInGroupList = [];
    let groupStr = "";
    for(let group of this.groupList){
      if(group.checked){
        groupStr += group.name+" ";
        newInGroupList.push(group);
      }
    }
    if(this.personalInfoPage){
      this.personalInfoPage.inGroup = groupStr;
    }
    let inGroups = this.inGroups;
    for(let ingroup of inGroups){
      this.groupService.deleteInGroup(this.personalUserInfo.id,ingroup).subscribe(group=>{
        // this.groupService.updateGroup(group,'count',group['count']-1)
      })
    }
    for(let inGroup of newInGroupList){
      this.groupService.addInGroup(this.personalUserInfo.id,inGroup).subscribe(group=>{
        // this.groupService.updateGroup(group,'count',group['count']+1)
      })
    }
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
                  this.groupList = groupList;
                }
              })
            }
          }
        ]
      });
      prompt.present();


  }




}
