import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

/**
 * Generated class for the SearchUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-user',
  templateUrl: 'search-user.html',
})
export class SearchUserPage {

  // contactsList:[{include:{name}}]=null;
  // contact:{include:{name}}=null;
   contactsList=[];

  constructor(private authService:AuthServiceProvider,private app:App,public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();
  }

  initializeItems() {
    // this.contactsList = [{id: '3', name: 'haha', avatar: './assets/imgs/user.jpg'}, {
    //   id: '4',
    //   name: 'hhh',
    //   avatar: './assets/imgs/avatar.jpg'
    // }, {id: '5', name: 'haha', avatar: './assets/imgs/to-user.jpg'}]
  }

  contactTapped(contact) {
    console.log('contact');
    this.navCtrl.push('PersonalInfoPage',{'username':contact.include.name});

  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    this.contactsList = [];

    // set val to the value of the searchbar
    let val = ev.target.value;

    if(val && val.trim() != ''){
      this.authService.getUserInfoByNameLike(val).subscribe(contacts=>{
        for(let contact of contacts){
          this.contactsList.push(contact);
        }
      })
    }


    // if the value is an empty string don't filter the items
    // if (val && val.trim() != '') {
    //   this.contactsList = this.contactsList.filter((item) => {
    //     return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //   })
    // }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchUserPage');
  }

}
