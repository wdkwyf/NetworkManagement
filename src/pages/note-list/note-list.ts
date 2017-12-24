import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {QQSDK, QQShareOptions} from "@ionic-native/qqsdk";
// import {FileChooser} from "@ionic-native/file-chooser";
// import {FilePath} from "@ionic-native/file-path";

/**
 * Generated class for the NoteListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-note-list',
  templateUrl: 'note-list.html',
})
export class NoteListPage {
  noteContent = "";
  public imgs = ['aaa', 'bbb'];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private qq: QQSDK,
              // private filePath: FilePath,
              // private fileChooser: FileChooser,
              private actionSheetCtrl: ActionSheetController,
              private photoViewer: PhotoViewer,) {
  }

  static ionViewDidLoad() {
    console.log('ionViewDidLoad 相遇时刻');
  }

  addMeetTime() {
    this.presentActionSheet();
  }

  postNote() {
  }

  onFocus() {
    console.log("input focused");
  }

  public viewPhoto(i) {
    this.photoViewer.show(this.imgs[i], '拍摄照片')
  }

  // shareImage() {
  //   this.fileChooser.open()
  //     .then(uri => {
  //       console.log(uri);
  //       this.filePath.resolveNativePath(uri)
  //         .then(filePath => {
  //           console.log(filePath);
  //           const clientOptions: QQShareOptions = {
  //             client: this.qq.ClientType.QQ,
  //             scene: this.qq.Scene.QQ,
  //             title: '交换图片',
  //             image: filePath.split("://")[1],
  //             description: '向您分享了一张图片',
  //           };
  //           this.qq.shareImage(clientOptions).then(() => {
  //             console.log('exchange image success');
  //           })
  //         })
  //         .catch(err => console.log(err));
  //     })
  //     .catch(e => console.log(e));
  // }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [{
        text: '通过QQ发送',
        handler: () => {
          // this.shareImage();
        }
      }, {
        text: '我已经接收了',
        handler: () => {



          this.navCtrl.push('AddNotePage');
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

  createNoteClicked() {
    this.navCtrl.push('AddNotePage')

  }


}
