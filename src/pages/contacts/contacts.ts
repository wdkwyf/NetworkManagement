import {Component, ElementRef, ViewChild} from '@angular/core';
import {
  AlertController, App, IonicPage, MenuController, NavController, NavParams,
  PopoverController, ToastController
} from 'ionic-angular';
import {ChatPage} from "../chat/chat";
import {PopoverPage} from "./popover";
import {HttpClient} from "@angular/common/http";
import {FileOpener} from "@ionic-native/file-opener";
import {File} from "@ionic-native/file";
import {FileTransfer} from "@ionic-native/file-transfer";
import {CardServiceProvider} from "../../providers/card-service/card-service";
// import {FileChooser} from "@ionic-native/file-chooser";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {AppConfig} from "../../app/app.config";
import {GroupServiceProvider} from "../../providers/group-service/group-service";
import {ContactServiceProvider} from "../../providers/contact-service/contact-service";

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {
  @ViewChild('popoverContent', {read: ElementRef}) content: ElementRef;
  @ViewChild('popoverText', {read: ElementRef}) text: ElementRef;
  contactsList; //= [{id:'3',name:'haha',avatar:'./assets/imgs/to-user.jpg'},{id:'4',name:'hhh',avatar:'./assets/imgs/to-user.jpg'},{id:'5',name:'haha',avatar:'./assets/imgs/to-user.jpg'}]
  username = '';
  userInfo;
  inGroupsId=[];
  refresh = true;
  private readonly avatarURL: string = 'http://120.79.42.137:8080/file/Ud7adca934ab4e/Card/Userinfo/';


  constructor(private contactService:ContactServiceProvider,
              private popoverCtrl: PopoverController,
              public menu: MenuController,
              private navCtrl: NavController,
              private http: HttpClient,
              private transfer: FileTransfer,
              private fileOpener: FileOpener,
              private file: File,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private cardService: CardServiceProvider,
              private auth: AuthServiceProvider,
              private groupService:GroupServiceProvider,
              public navParams: NavParams) {
    this.auth.getUserName().subscribe(name => {
      console.log(name, 'name');
      this.username = name;
      // if (name == 'Guest') {
      //   this.navCtrl.setRoot('LoginPage');
      // }
    });

    // this.initializeItems();

  }

  presentPopover(ev) {
    this.refresh = true;

    let popover = this.popoverCtrl.create('PopoverPage', {
      username: this.username,
    });

    popover.present({
      ev: ev
    });
  }

  public logout() {
    this.auth.logout().subscribe(success => {
      this.navCtrl.setRoot('LoginPage');
    })
  }

  showGroupList() {
    console.log(this.userInfo);
    this.navCtrl.push("GroupListPage",{'userInfo':this.userInfo});
  }

  initializeItems() {

    this.contactService.findContactsByUsername(AppConfig.getUsername()).subscribe(contactsList=>{
      this.contactsList = contactsList;
    });
  //   //todo 数据库 userName->contactName->contactInfo
  //   // this.contactsList = [
  //   //   {
  //   //     "id": 1514103055481,
  //   //     "phone": "15221530965",
  //   //     "workplace": "上海市 市辖区 杨浦区",
  //   //     "occupation": "学生",
  //   //     "job": "IT/互联网 研发",
  //   //     "influence": 10,
  //   //     "organization": "同济大学",
  //   //     "university": "同济大学",
  //   //     "qq": "593880978",
  //   //     "wechat": "gavin",
  //   //     "weibo": "15221530965",
  //   //     "include": {
  //   //       "id": 1514101735335,
  //   //       "name": "Gavin",
  //   //       "password": "1996",
  //   //       "email": "2831730038@qq.com",
  //   //       "createtime": 1514101735335,
  //   //       "cardid": "1",
  //   //       "flag": 0,
  //   //       "reason": "发表黄色言论"
  //   //     },
  //   //     "hasgroup": []
  //   //   },
  //   //   {
  //   //     "id": 1514205158334,
  //   //     "phone": "15255530965",
  //   //     "workplace": "杭州市 市辖区 余杭区",
  //   //     "occupation": "总裁",
  //   //     "job": "IT/互联网 管理",
  //   //     "influence": 10,
  //   //     "organization": "阿里巴巴",
  //   //     "university": "杭州师范大学",
  //   //     "qq": "593880978",
  //   //     "wechat": "gavin",
  //   //     "weibo": "15221530965",
  //   //     "include": {
  //   //       "id": 1513250372495,
  //   //       "name": "马小云",
  //   //       "password": "1996",
  //   //       "email": "123@qq.com",
  //   //       "createtime": 1513250372495,
  //   //       "cardid": "1",
  //   //       "flag": 1,
  //   //       "reason": ""
  //   //     },
  //   //     "hasgroup": []
  //   //   }
  //   //   // {
  //   //   //   'phone': '15221530965',
  //   //   //   'workplace': '上海市 市辖区 杨浦区',
  //   //   //   'occupation': '学生',
  //   //   //   'job': 'IT/互联网 研发',
  //   //   //   'influence': 10,
  //   //   //   'organization': '上海交通大学',
  //   //   //   'university': '上海交通大学',
  //   //   //   'qq': '593880978',
  //   //   //   'wechat': 'anna',
  //   //   //   'weibo': '15221530965',
  //   //   //   'avatar': './assets/imgs/avatar.jpg',
  //   //   //   'include': {'id': 3, 'name': 'hhh','email':'593880978@qq.com'}},
  //   //   // {
  //   //   //   'phone': '15221530965',
  //   //   //   'workplace': '上海市 市辖区 杨浦区',
  //   //   //   'occupation': '学生',
  //   //   //   'job': 'IT/互联网 研发',
  //   //   //   'influence': 10,
  //   //   //   'organization': '上海交通大学',
  //   //   //   'university': '上海交通大学',
  //   //   //   'qq': '593880978',
  //   //   //   'wechat': 'anna',
  //   //   //   'weibo': '15221530965',
  //   //   //   'avatar': './assets/imgs/to-user.jpg',
  //   //   //   'include': {'id': 4, 'name': 'aa','email':'593880978@qq.com'}}
  //   // ]
  }

  // ionViewWillLoad(){
  //   console.log("ion will load");
  //   this.initializeItems();
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
  }

  ionViewWillEnter(){
    console.log("will enter");
    this.auth.getUserInfoByName(AppConfig.getUsername()).subscribe(data=>{
      this.userInfo = data;
    });
    if(this.refresh){
      this.initializeItems();
    }
  }


  contactTapped(username) {
    console.log('contactTapped'+username);
    this.navCtrl.push('PersonalInfoPage', {'username':username});

  }


  addGroup(contactName) {
    console.log("addGroupClicked");
    this.groupService.getInGroupOfUser(contactName).subscribe(inGroups=>{
      for(let group of inGroups){
        this.inGroupsId.push(group['id']);
      }

    });
    let getData = function(data){
      return new Promise((resolve,reject)=>{
        console.log("in contactsPage"+this.a);
        console.log("回调函数"+data);
        resolve("hhh");
      })
    };
    this.navCtrl.push('AddGroupPage',{'contactName':contactName,'inGroupsId':this.inGroupsId,'callback':getData});
  }



  imgTapped() {
    console.log('imgTapped');
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    // this.initializeItems();
    this.refresh = false;

    this.contactService.findContactsByUsername(AppConfig.getUsername()).subscribe(contactsList=>{
      this.contactsList = contactsList;
      // set val to the value of the searchbar
      let val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.contactsList = this.contactsList.filter((item) => {
          return (item.include.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }

    });

  }

}
