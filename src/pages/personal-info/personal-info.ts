import { Component } from '@angular/core';
import {IonicPage, Modal, ModalController, ModalOptions, NavController, NavParams} from 'ionic-angular';
import {ChatPage} from "../chat/chat";
import {NoteListPage} from "../note-list/note-list";
import { App } from 'ionic-angular';

/**
 * Generated class for the PersonalInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-info',
  templateUrl: 'personal-info.html',
})
export class PersonalInfoPage {

  user;
  showDetail = false;
  influenceHref = ""
  labelNames=["手机号","邮箱","工作地","影响力","职位", "职业", "组织", "大学", "QQ", "Wechat", "Weibo"];
  userValues;//=[this.user.phone,this.user.email,this.user.workPlaceStr,this.user.occupation,this.user.jobStr,
        //this.user.organization,this.user.university,this.user.qq,this.user.wechat,this.user.weibo];

  constructor(private app:App,public navCtrl: NavController, public navParams: NavParams,private modal: ModalController) {
  }


  ionViewWillLoad(){
    //todo get from数据库
    console.log("will load");
    this.user ={
      avatar : "../assets/imgs/avatar.jpg",
      name:"anna",
      phone :null,// "15221530965",
      email:"593880978@qq.com",
      workPlaceStr:"上海市 市辖区 闵行区",
      influence:10,
      occupation : "工程师",
      jobStr : "IT/互联网 研发",
      organization : "上海交通大学",
      university : "上海交通大学",
      qq : "593880978",
      wechat:"anna",
      weibo:"15221530965",
    };
    this.updateUserValues();

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalInfoPage');
  }

  viewNote(){
    this.app.getRootNav().push('NoteListPage')
  }
  sendMessage(){
    this.app.getRootNav().push('ChatPage');
  }

  updateUserValues()
  {
    this.userValues=[this.user.phone,this.user.email,this.user.workPlaceStr,this.user.influence,this.user.occupation,this.user.jobStr,
      this.user.organization,this.user.university,this.user.qq,this.user.wechat,this.user.weibo];
  }

  showInfoDetail(){
    this.showDetail = !this.showDetail;
  }

  addGroup(){
    console.log("addGroup");
    this.app.getRootNav().push('AddGroupPage');
  }


  editBtnClicked(){
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };


    const myModal: Modal = this.modal.create('EditInfoPage', {user:this.user}, myModalOptions);

    myModal.present();

    myModal.onDidDismiss((data) => {
      console.log("I have dismissed.");
      console.log(this.user);
      this.user = data;
      this.updateUserValues();
      console.log(this.user);

    });

    myModal.onWillDismiss((data) => {
      console.log("I'm about to dismiss");
      console.log(data);
    });

  }

}
