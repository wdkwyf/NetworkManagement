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
  msgList = [
    {
      "messageId":"1",
      "userId":"1",
      "userName":"Anna",
      "userImgUrl":"./assets/user.jpg",
      "toUserId":"2",
      "toUserName":"haha",
      "userAvatar":"../assets/imgs/avatar.jpg",
      "time":"11:59",
      "message":"A good programmer is someone who always looks both ways before crossing a one-way street. ",
      "status":"success"

    },
    {
      "messageId":"2",
      "userId":"2",
      "userName":"haha",
      "userImgUrl":"./assets/to-user.jpg",
      "toUserId":"1",
      "toUserName":"Anna",
      "userAvatar":"../assets/imgs/to-user.jpg",
      "time":'12:00',
      "message":"Don’t worry if it doesn't work right. If everything did, you’d be out of a job.",
      "status":"success"
    }];
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
