import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {CameraOptions, Camera} from "@ionic-native/camera";
import {HttpClient} from '@angular/common/http';
import {isUndefined} from "ionic-angular/util/util";
import {FileChooser} from "@ionic-native/file-chooser";
import {FileOpener} from "@ionic-native/file-opener";
import {FileTransfer, FileTransferObject} from "@ionic-native/file-transfer";
import {File} from '@ionic-native/file';
import {CardServiceProvider} from "../../providers/card-service/card-service";
import {isSuccess} from "@angular/http/src/http_utils";

@IonicPage()
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'home.html'
})
export class HomePage {
  username = '';
  email = '';
  readonly unlogin = 'Guest';


  constructor(private camera: Camera,
              private navCtrl: NavController,
              private http: HttpClient,
              private transfer: FileTransfer,
              private fileOpener: FileOpener,
              private file: File,
              private alertCtrl:AlertController,
              private fileChooser: FileChooser,
              private card: CardServiceProvider,
              private auth: AuthServiceProvider) {
    let info = this.auth.getUserInfo();
    if (isUndefined(info)) {
      this.username = this.unlogin;
      this.email = this.unlogin;

    } else {
      this.username = info['name'];
      this.email = info['email'];
    }
  }

  public scanCard() {
    this.card.scanCard(this.username).subscribe(isSuccess => {
      console.log(isSuccess);
      this.showConfirm();

    });

  }
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: '搜索人脉',
      message: '你想要根据名片扫描信息搜索人脉吗？',
      buttons: [
        {
          text: '不用了',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '好的',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  public logout() {
    this.auth.logout().subscribe(success => {
      this.navCtrl.setRoot('LoginPage');
    })
  }
}
