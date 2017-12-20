import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  msgList = [];
  user = {id: '1',
    name: 'Anna',
    avatar: './assets/avatar.jpg'};
  toUser:Object;
  editorMsg = '';
  showEmojiPicker = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.toUser = {
      id: navParams.get('id'),
      name: navParams.get('name')
    };
    this.msgList = navParams.get('msgList');
  };

  sendMsg(){
    console.log("sendMsg")
  }

  onFocus(){
    console.log("input focused");
  }

  switchEmojiPicker(){
    console.log("switchEmojiPiker clicked")
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

}
