import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  toUser:Object;

  constructor(private app:App,public navCtrl: NavController, public navParams: NavParams) {
    this.toUser = {
      id:'2',
      name:'haha',
      msgList:[
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
    }]
    }
  }

  itemClicked(){
    this.app.getRootNav().push('ChatPage',this.toUser);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }

}
