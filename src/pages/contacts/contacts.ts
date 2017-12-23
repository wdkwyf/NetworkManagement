import {Component, ElementRef, ViewChild} from '@angular/core';
import {
  AlertController, App, IonicPage, MenuController, NavController, NavParams,
  PopoverController
} from 'ionic-angular';
import {ChatPage} from "../chat/chat";
import {PopoverPage} from "./popover";
import {HttpClient} from "@angular/common/http";
import {FileOpener} from "@ionic-native/file-opener";
import {Camera} from "@ionic-native/camera";
import {File} from "@ionic-native/file";
import {FileTransfer} from "@ionic-native/file-transfer";
import {CardServiceProvider} from "../../providers/card-service/card-service";
import {FileChooser} from "@ionic-native/file-chooser";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

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

  constructor(private popoverCtrl: PopoverController,
              private camera: Camera,
              public menu: MenuController,
              private navCtrl: NavController,
              private http: HttpClient,
              private transfer: FileTransfer,
              private fileOpener: FileOpener,
              private file: File,
              private alertCtrl: AlertController,
              private fileChooser: FileChooser,
              private cardService: CardServiceProvider,
              private auth: AuthServiceProvider,
              public navParams: NavParams) {
    this.initializeItems();
    this.auth.getUserName().subscribe(name => {
      console.log(name, 'name');
      this.username = name;
    });
  }

  presentPopover(ev) {

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
    this.navCtrl.push("GroupListPage");
  }

  initializeItems() {
    this.contactsList = [{id: '3', name: 'haha', avatar: './assets/imgs/user.jpg'}, {
      id: '4',
      name: 'hhh',
      avatar: './assets/imgs/avatar.jpg'
    }, {id: '5', name: 'haha', avatar: './assets/imgs/to-user.jpg'}]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
  }


  contactTapped(contact) {
    console.log('contact');
    this.navCtrl.push('PersonalInfoPage', contact);

  }

  addGroup() {
    console.log("addGroupClicked");
    this.navCtrl.push('AddGroupPage');
  }

  imgTapped() {
    console.log('imgTapped');
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.contactsList = this.contactsList.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
