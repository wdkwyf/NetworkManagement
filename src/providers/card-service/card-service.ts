import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {FileTransfer, FileTransferObject, FileUploadOptions} from "@ionic-native/file-transfer";
import {File} from "@ionic-native/file";
import {FileOpener} from "@ionic-native/file-opener";
import {Observable} from "rxjs/Observable";
import vcf from 'vcf';
import {AlertController, Loading, LoadingController, NavController} from "ionic-angular";
import {isUndefined} from "ionic-angular/util/util";
import { ToastController } from 'ionic-angular';

/*
  Generated class for the CardServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CardServiceProvider {
  private readonly getAllFriendNamesURL: string = 'http://120.79.42.137:8080/Entity/Ud7adca934ab4e/Card/Cards/?Cards.username=';
  private readonly getIdByNamesURL: string = 'http://120.79.42.137:8080/Entity/Ud7adca934ab4e/Card/Cards/?';
  private readonly getVcfURL: string = 'http://120.79.42.137:8080/file/Ud7adca934ab4e/Card/Cards/';
  private readonly postCardURL: string = 'http://120.79.42.137:8080/Entity/Ud7adca934ab4e/Card/Cards/';
  loading: Loading;
  shareCardURL: string = null;

  constructor(public http: HttpClient,
              private camera: Camera,
              private alertCtrl: AlertController,
              private transfer: FileTransfer,
              private fileOpener: FileOpener,
              public toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private file: File,) {
    console.log('Hello CardServiceProvider Provider');
  }

  public scanCard() {
    const cardScannerURL: string = "http://bcr2.intsig.net/BCRService/BCR_VCF2?user=wuyufei@sjtu.edu.cn&pass=TC6ELKF3HMKCCCBL&lang=15";
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    return Observable.create(observer => {
      this.camera.getPicture(options).then(imageData => {
        const fileTransfer: FileTransferObject = this.transfer.create();
        this.showLoading('名片正在识别，请稍后');
        fileTransfer.upload(imageData, cardScannerURL).then(data => {
          let card = new vcf().parse(data.response);
          let friendName = '';
          if (!isUndefined(card['data']['fn'])) {
            friendName = card['data']['fn']._data;
          } else {
            observer.next('');
            observer.complete();
            return;
          }
          let timeNow = new Date().getTime();
          console.log(timeNow);
          let vcfName = friendName + '>' + timeNow + '.vcf';
          this.file.writeFile(this.file.externalDataDirectory, vcfName, data.response).then((success) => {
            console.log('write vcf file success: ' + vcfName);
            console.log(this.file.externalDataDirectory + vcfName);
            // open and add system contacts
            this.fileOpener.open((this.file.externalDataDirectory + vcfName), 'text/x-vcard').then(() => {
                observer.next(vcfName);
                observer.complete();
              }
            ).catch(e => console.log('file not open', e.message));

          }).catch(e => {
            console.log('write file fail', e)
          });
        }).catch(e => {
          console.log('can not update', e)
        });
      }).catch(e => console.log('camera not work', e));
    })
  }

  public downloadCard(url) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    let timeNow = new Date().getTime();
    fileTransfer.download(url, this.file.externalCacheDirectory + 'shareCard' + timeNow + '.vcf').then(entry => {
      console.log('download complete', entry.toURL());
      this.fileOpener.open(entry.toURL(), 'text/x-vcard').then(() => {
        }
      ).catch(e => console.log('file not open', e.message));
    })
  }

  public saveCard(friendname) {
    return Observable.create(observer => {
      this.fileOpener.open((this.file.externalCacheDirectory + 'tmp-' + friendname + '.vcf'), 'text/x-vcard').then(() => {
          observer.next();
          observer.complete();
        }
      ).catch(e => console.log('file not open', e.message));
    });
  }

  public viewDetailCard(username, friendname) {
    return Observable.create(observer => {
      let cardInfo = null;
      this.http.get(this.getIdByNamesURL + 'Cards.username=' +
        username + '&Cards.friendname=' + friendname).subscribe(data => {
        let id = data["Cards"][0]['id'];
        console.log('id', id);
        let filename = 'tmp-' + friendname + '.vcf';
        this.shareCardURL = this.getVcfURL + id;
        const fileTransfer: FileTransferObject = this.transfer.create();
        fileTransfer.download(this.shareCardURL, this.file.externalCacheDirectory + filename).then(entry => {
          console.log('download complete', entry.toURL());
          this.file.readAsText(this.file.externalCacheDirectory, filename).then(content => {
            console.log('content', content);
            let card = new vcf().parse(content);
            cardInfo = {
              title: card["data"]["title"][0]._data,
              email: card["data"]["email"]._data,
              workphone: card["data"]['tel'][1]._data,
              mobilephone: card["data"]['tel'][0]._data,
              address: card["data"]["label"]._data,
              id: id
            };
            observer.next(cardInfo);
            observer.complete();
            console.log('card', card['data']['fn']);
            // console.log('card', card['version']);
          }, err => {
            console.log(err.message);
          })
        })
      });
    });
  }

  public syncCard(userName, vcfName) {
    console.log('userName', userName);
    console.log('vcfName', vcfName);
    let friendname = vcfName.split('>')[0];
    console.log('friengName', friendname);
    // post username friendname
    this.http.post(this.postCardURL, {
      'username': userName,
      'friendname': friendname
    }).subscribe(() => {
      // getId
      this.http.get(this.getIdByNamesURL + 'Cards.username=' +
        userName + '&Cards.friendname=' + friendname).subscribe(data => {
        let id = data["Cards"][0]['id'];
        console.log('id', id);
        // upload file
        this.showLoading('名片同步中，请稍后');
        const fileTransfer: FileTransferObject = this.transfer.create();
        fileTransfer.upload(this.file.externalDataDirectory + vcfName, this.postCardURL + id).then(response => {
          console.log(response.response);
          let toast = this.toastCtrl.create({
            message: '同步成功',
            duration: 3000
          });
          toast.present();

        });
      });
    });
  }

  public shareCard() {

  }

  showLoading(text) {
    this.loading = this.loadingCtrl.create({
      content: text,
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  public viewCloudCardName(username) {
    let list: Array<string> = [];
    return Observable.create(observer => {
      this.http.get(this.getAllFriendNamesURL + username).subscribe(data => {
        data['Cards'].forEach(value => {
          list.push(value['friendname']);
        });
        observer.next(list);
        observer.complete();
      });
    });

  }


  public dismissLoading(){
    this.loading.dismiss();
  }
  // ask if user want to sync user according to this business card.
  public showSyncConfirm(vcfName, username) {
    let confirm = this.alertCtrl.create({
      title: '名片备份',
      message: '你想要在云端备份该名片嘛？',
      buttons: [
        {
          text: '不用了',
          handler: () => {
            console.log('disagree clicked');
          }
        },
        {
          text: '好的',
          handler: () => {
            this.syncCard(username, vcfName);
            console.log('Agree Clicked');
          }
        }
      ]
    });
    confirm.present();
  }
}
