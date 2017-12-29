import {Component} from "@angular/core";
import {AlertController, App, IonicPage, NavController, NavParams, ViewController} from "ionic-angular";
import {HttpClient} from "@angular/common/http";
import {FileOpener} from "@ionic-native/file-opener";
import {Camera} from "@ionic-native/camera";
import {File} from "@ionic-native/file";
import {FileTransfer} from "@ionic-native/file-transfer";
import {CardServiceProvider} from "../../providers/card-service/card-service";
import {ImagePicker} from '@ionic-native/image-picker';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";

declare var qrcode;

@IonicPage()
@Component({
  template: `
    <ion-list>
      <button ion-item (click)="addContact()">
        <ion-icon name="person-add" item-left></ion-icon>
        添加人脉好友
      </button>
      <button ion-item (click)="scanCard()">
        <ion-icon name="qr-scanner" item-left></ion-icon>
        扫描名片
      </button>
      <button ion-item (click)="scanQR()">
        <ion-icon name="card" item-left></ion-icon>
        扫描二维码
      </button>
    </ion-list>
  `
})
export class PopoverPage {
  username: string = '';

  constructor(private app: App,
              private navParams: NavParams,
              private camera: Camera,
              private navCtrl: NavController,
              private http: HttpClient,
              private transfer: FileTransfer,
              private fileOpener: FileOpener,
              private file: File,
              private imagePicker: ImagePicker,
              private alertCtrl: AlertController,
              private barcodeScanner: BarcodeScanner,
              private cardService: CardServiceProvider,
              private view: ViewController) {
    this.username = this.navParams.data.username;
  }

  /* ------------- Popover action -------------- */
  public addContact() {
    this.navCtrl.push("SearchUserPage");
    console.log("添加人脉");
    this.view.dismiss();
  }

  public scanCard() {
    this.cardService.scanCard().subscribe(vcfName => {
      if (vcfName === '') {
        console.log('vcfName is null');
      }
      if (vcfName != '') {
        // ask if user want to search user according to this business card.
        this.showSearchConfirm(vcfName, this.username);
      }
    });
  }

  public showSearchConfirm(vcfName, username) {
    let confirm = this.alertCtrl.create({
      title: '搜索人脉',
      message: '你想要根据扫描名片信息搜索人脉吗？',
      buttons: [
        {
          text: '不用了',
          handler: () => {
            this.cardService.showSyncConfirm(vcfName, username);
            console.log('Disagree clicked');
          }
        },
        {
          text: '好的',
          handler: () => {
            this.navCtrl.push('PersonalInfoPage');
            this.cardService.showSyncConfirm(vcfName, username);
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
    this.cardService.dismissLoading();
  }

  public scanQR() {
    let pictureOptions = {
      maximumImagesCount: 1,
    };
    //choose from image or camera
    let confirm = this.alertCtrl.create({
      message: '选择二维码来源',
      buttons: [
        {
          text: '相册',
          handler: () => {
            this.imagePicker.getPictures(pictureOptions).then((results) => {
              let imageUrl = results[0];
              console.log('QR Image URI: ' + imageUrl);
              qrcode.callback = (data) => {
                console.log('QR: ', data);
                if (data.indexOf('http://') == -1) {
                  // TODO url is friend name
                  // data: FRIEND_NAME
                }
                else {
                  // data = 'http://120.79.42.137:8080/file/Ud7adca934ab4e/Card/Cards/1513695710642';
                  // url is cloud card
                  console.log('download cloud card');
                  this.cardService.downloadCard(data);
                }
              };
              // this method MUST be in production mode(no liveReload)
              qrcode.decode(imageUrl);
            }, err => {
              console.log(err.message)
            });
            console.log('Disagree clicked');
          }
        },
        {
          text: '拍摄',
          handler: () => {
            console.log('Agree clicked');
            this.barcodeScanner.scan().then(barcodeData => {
              console.log('QR: ', barcodeData.text);
              if (barcodeData.text.indexOf('http://') == -1) {
                console.log('download cloud card');
                this.cardService.downloadCard(barcodeData.text);
              }
              else {
                // TODO url is friend name
                // data: FRIEND_NAME
              }

            }, (err) => {
              console.log('Error: ', err);
            });
          }
        }
      ]
    });
    confirm.present();
  }

  /* ------------- Popover action -------------- */

}
