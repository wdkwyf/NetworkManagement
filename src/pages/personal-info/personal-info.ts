import {Component} from '@angular/core';
import {IonicPage, Modal, ModalController, ModalOptions, NavController, NavParams} from 'ionic-angular';
import {ChatPage} from "../chat/chat";
import {NoteListPage} from "../note-list/note-list";
import {App} from 'ionic-angular';
import {AppConfig} from "../../app/app.config";
import {ContactServiceProvider} from "../../providers/contact-service/contact-service";
import {GroupServiceProvider} from "../../providers/group-service/group-service";

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

  userInfo;
  personalUserInfo;
  showDetail = false;
  inGroupsId = [];
  inGroup = '';
  influenceHref = "";
  relation = -1;
  labelNames = ["手机号", "邮箱", "工作地", "影响力", "职位", "职业", "组织", "大学", "QQ", "Wechat", "Weibo"];
  userValues;//=[this.user.phone,this.user.email,this.user.workPlaceStr,this.user.occupation,this.user.jobStr,
  //this.user.organization,this.user.university,this.user.qq,this.user.wechat,this.user.weibo];

  constructor(private groupService: GroupServiceProvider, private contactService: ContactServiceProvider, private app: App, public navCtrl: NavController, public navParams: NavParams, private modal: ModalController) {

    console.log('constructor');
    this.personalUserInfo = contactService.findUserInfoByUsername(navParams.get('username'));
    this.userInfo = AppConfig.getUserInfo();
    console.log("navParam--username--" + navParams.get('username'));
    if (!navParams.get('username')) {
      this.relation = 0;//本人
      this.personalUserInfo = this.userInfo;
    } else if (this.contactService.areContacts(this.userInfo.include.name, this.personalUserInfo.include.name)) {
      this.relation = 1;//好友
      groupService.getInGroupOfUser(this.personalUserInfo.include.name).subscribe(inGroups => {
        for (let group of inGroups) {
          this.inGroup += group['name'] + ' ';
          this.inGroupsId.push(group['id']);
        }

      })

    } else {
      this.relation = 2;//陌生人
    }
    this.updateUserValues();


  }


  //
  ionViewWillLoad() {
    //   //todo get from数据库
    console.log("will load");
    //   // this.user ={
    //   //   avatar : "../assets/imgs/avatar.jpg",
    //   //   name:"anna",
    //   //   phone :null,// "15221530965",
    //   //   email:"593880978@qq.com",
    //   //   workPlaceStr:"上海市 市辖区 闵行区",
    //   //   influence:10,
    //   //   occupation : "工程师",
    //   //   jobStr : "IT/互联网 研发",
    //   //   organization : "上海交通大学",
    //   //   university : "上海交通大学",
    //   //   qq : "593880978",
    //   //   wechat:"anna",
    //   //   weibo:"15221530965",
    //   // };
    //   this.updateUserValues();
    //
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalInfoPage');
  }

  viewNote() {
    this.navCtrl.push('NoteListPage',{'username':this.userInfo.include.name,'contactName':this.personalUserInfo.include.name})
  }

  sendMessage() {
    this.navCtrl.push('ChatPage');
  }

  updateUserValues() {
    this.userValues = [this.personalUserInfo.phone, this.personalUserInfo.include.email, this.personalUserInfo.workplace, this.personalUserInfo.influence, this.personalUserInfo.occupation, this.personalUserInfo.job,
      this.personalUserInfo.organization, this.personalUserInfo.university, this.personalUserInfo.qq, this.personalUserInfo.wechat, this.personalUserInfo.weibo];
  }

  showInfoDetail() {
    this.showDetail = !this.showDetail;
  }


  addGroup() {
    console.log("addGroup");
    // let getData = function(data){
    //   return new Promise((resolve,reject)=>{
    //     console.log("in contactsPage"+this.a);
    //     console.log("回调函数的参数："+data);
    //     this.inGroup = data;
    //     resolve("hhh");
    //   })
    // };
    this.navCtrl.push('AddGroupPage', {
      'contactName': this.personalUserInfo.include.name,
      'inGroupsId': this.inGroupsId,
      'personalInfoPage': this
    });
  }


  editBtnClicked() {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModal: Modal = this.modal.create('EditInfoPage', {user: this.userInfo}, myModalOptions);

    myModal.present();

    myModal.onDidDismiss((data) => {
      console.log("I have dismissed.");
      console.log(this.userInfo);
      this.userInfo = data;
      this.updateUserValues();
      console.log(this.userInfo);

    });

    myModal.onWillDismiss((data) => {
      console.log("I'm about to dismiss");
      console.log(data);
    });

  }

}
