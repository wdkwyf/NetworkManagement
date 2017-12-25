import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {QQSDK, QQShareOptions} from "@ionic-native/qqsdk";
import {ImagePicker} from "@ionic-native/image-picker";
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the MeetTimeListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-note-list',
  templateUrl: 'note-list.html',
})
export class MeetTimeListPage {
  public noteList: any;
  private readonly getURL: string = 'http://120.79.42.137:8080/Entity/Ud7adca934ab4e/Card/Meettime/';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private qq: QQSDK,
              public http: HttpClient,
              private imagePicker: ImagePicker,
              private actionSheetCtrl: ActionSheetController,) {
    this.http.get(this.getURL).subscribe(data => {
      this.noteList = data['Meettime'];
    })
  }

  static ionViewDidLoad() {
    console.log('ionViewDidLoad 相遇时刻');
  }

  addMeetTime() {
    this.presentActionSheet();
  }

  public viewMeettime(i) {
    this.navCtrl.push('NoteDetailPage', {content: this.noteList[i]});
  }

  shareImage() {
    let pictureOptions = {
      maximumImagesCount: 1,
      quality: 50,
      width: 512,
      height: 512,
      outputType: 1
    };
    this.imagePicker.getPictures(pictureOptions).then(results => {
      let base64 = results[0];
      const clientOptions: QQShareOptions = {
        client: this.qq.ClientType.QQ,
        scene: this.qq.Scene.QQ,
        title: '交换图片',
        image: base64,
        description: 'hi,我给你分享了我们的邂逅时刻哦',
      };
      this.qq.shareImage(clientOptions).then(() => {
        console.log('exchange image success');
      })
    })
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [{
        text: '通过QQ发送',
        handler: () => {
          this.shareImage();
        }
      }, {
        text: '我已经接收了',
        handler: () => {
          this.navCtrl.push('AddMeetTimePage');
        }
      }, {
        text: '取消',
        role: 'cancel',
      }]
    });
    actionSheet.present().then(value => {
      return value;
    });
  }
}
