import {Component} from '@angular/core';
import {IonicPage, Modal, ModalController, ModalOptions, NavController, NavParams} from 'ionic-angular';
import {ChatPage} from "../chat/chat";
import {NoteListPage} from "../note-list/note-list";
import {App} from 'ionic-angular';
import {AppConfig} from "../../app/app.config";
import {ContactServiceProvider} from "../../providers/contact-service/contact-service";
import {GroupServiceProvider} from "../../providers/group-service/group-service";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {TabsPage} from "../tabs/tabs";

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

  userInfo=null;
  personalUserInfo=null;
  showDetail = false;
  inGroupsId = [];
  inGroup = '';
  inGroups=[];
  joinGroups=[];
  influence = "";
  relation = -1;
  labelNames = ["手机号", "邮箱", "工作地", "影响力", "职位", "职业", "组织", "大学", "QQ", "Wechat"];
  userValues = [];//=[this.user.phone,this.user.email,this.user.workPlaceStr,this.user.occupation,this.user.jobStr,
  //this.user.organization,this.user.university,this.user.qq,this.user.wechat,this.user.weibo];
  private readonly avatarURL: string = 'http://120.79.42.137:8080/file/Ud7adca934ab4e/Card/Userinfo/';

  constructor(private authService: AuthServiceProvider, private groupService: GroupServiceProvider, private contactService: ContactServiceProvider, private app: App, public navCtrl: NavController, public navParams: NavParams, private modal: ModalController) {


    // console.log('constructor');
    if(!navParams.get('username')){
      this.relation = 0;//本人
    }
    authService.getUserInfoByName(AppConfig.getUsername()).subscribe(data=>{
      this.userInfo = data;
      if(!navParams.get('username')){
        this.personalUserInfo = data;
        this.updateUserValues();
      }else{
        authService.getUserInfoByName(navParams.get('username')).subscribe(personalInfo=>{
          this.personalUserInfo = personalInfo;
          this.updateUserValues();
          this.contactService.areContacts(this.userInfo['id'], this.personalUserInfo['id']).subscribe(areContacts=>{
            if(areContacts){
              this.relation = 1;
              this.updateIngroups();
            }else{
              this.relation = 2;
            }
          });
        })
      }
    });
  }

  navToInfluence(username){
    this.navCtrl.push('InfluencePage',{'username':username});
  }

  updateIngroups(){
    this.groupService.getInGroupOfUser(this.personalUserInfo['include']['name']).subscribe(inGroups=>{
      if(inGroups['groups']){
        let hasGroups = this.userInfo.hasgroup;
        let hasGroupIds = [];
        for(let hasGroup of hasGroups){
          hasGroupIds.push(hasGroup.id);
        }
        this.inGroups = inGroups['groups'];
        this.inGroups = this.inGroups.filter(item=>{
          return(hasGroupIds.indexOf(item.id)>-1);
        });
        this.joinGroups = inGroups['joinGroups'];
        this.joinGroups = this.joinGroups.filter(item=>{
          return(hasGroupIds.indexOf(item.group.id)>-1);
        });
        for (let group of this.inGroups) {
          this.inGroup += group['name'] + ' ';
          this.inGroupsId.push(group['id']);
        }
      }
    })
  }


  ionViewWillLoad() {
    console.log("will load");
  }

  ionViewWillEnter(){
    console.log("will enter");
    // if(this.relation == 1){
    //   this.updateIngroups();
    // }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalInfoPage');
  }

  viewNote() {
    this.navCtrl.push('NoteListPage', {
      'username': this.userInfo['include']['name'],
      'contactName': this.personalUserInfo['include']['name']
    })
  }

  sendMessage() {
    this.navCtrl.push('ChatPage');
  }

  updateUserValues() {
    this.userValues = [this.personalUserInfo.phone, this.personalUserInfo.include.email, this.personalUserInfo.workplace, this.personalUserInfo.influence, this.personalUserInfo.occupation, this.personalUserInfo.job,
      this.personalUserInfo.organization, this.personalUserInfo.university, this.personalUserInfo.qq, this.personalUserInfo.wechat];
  }

  showInfoDetail() {
    this.showDetail = !this.showDetail;
  }

  addGroup() {
    console.log("addGroup");
    this.navCtrl.push('AddGroupPage',{
      'personalUser':this.personalUserInfo,
      'personalInfoPage': this
    })
  }

  addFriend(){
    this.contactService.addContact(this.userInfo.id,this.personalUserInfo.id).subscribe(data=>{})

    alert("添加成功");
    this.navCtrl.setRoot('TabsPage');
  }

  editBtnClicked() {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModal: Modal = this.modal.create('EditInfoPage', {'user': this.userInfo}, myModalOptions);

    myModal.present();

    myModal.onDidDismiss((data) => {
      console.log("I have dismissed.");
      console.log(this.userInfo);
      this.userInfo = this.personalUserInfo = data;
      this.updateUserValues();
      console.log(this.userInfo);

    });

    myModal.onWillDismiss((data) => {
      console.log("I'm about to dismiss");
      console.log(data);
    });

  }

}
