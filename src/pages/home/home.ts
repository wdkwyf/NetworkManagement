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

@IonicPage()
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'home.html'
})
export class HomePage {
  username = '';


  constructor(private camera: Camera,
              private navCtrl: NavController,
              private http: HttpClient,
              private transfer: FileTransfer,
              private fileOpener: FileOpener,
              private file: File,
              private alertCtrl: AlertController,
              private fileChooser: FileChooser,
              private card: CardServiceProvider,
              private auth: AuthServiceProvider) {
    this.auth.getUserName().subscribe(name => {
      console.log(name, 'name');
      this.username = name;
    });

  }

  public viewCloudCards() {
    this.navCtrl.push('CloudCardListPage');

  }

  public login() {
    this.navCtrl.setRoot('LoginPage');
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
