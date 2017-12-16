import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {CameraOptions, Camera} from "@ionic-native/camera";
import {HttpClient} from '@angular/common/http';
import {isUndefined} from "ionic-angular/util/util";
import {FileChooser} from "@ionic-native/file-chooser";
import {FileOpener} from "@ionic-native/file-opener";
import {FileTransfer, FileTransferObject} from "@ionic-native/file-transfer";
import {File} from '@ionic-native/file';

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
              private fileChooser: FileChooser,
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
    const cardScannerURL: string = "http://bcr2.intsig.net/BCRService/BCR_VCF2?user=wuyufei@sjtu.edu.cn&pass=TC6ELKF3HMKCCCBL&lang=15";
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(imageData => {
      const fileTransfer: FileTransferObject = this.transfer.create();
      fileTransfer.upload(imageData, cardScannerURL).then(data => {
        let timeNow = new Date().getTime();
        console.log(timeNow);
        let VCFName = this.username + timeNow + '.vcf';
        this.file.writeFile(this.file.externalDataDirectory, VCFName, data.response).then((success) => {
          console.log('write vcf file success: ' + VCFName);
          console.log(this.file.externalDataDirectory +VCFName);
          // open and add system contacts
          this.fileOpener.open((this.file.externalDataDirectory +VCFName), 'text/x-vcard').then(() => {
              console.log('file is opened');
            }
          ).catch(e=>console.log('file not open',e.message));
        }).catch(e=>{console.log('write file fail',e)});
      }).catch(e=>{console.log('can not update',e)});
    }).catch(e=>console.log('camera not work',e));

  }

  public logout() {
    this.auth.logout().subscribe(success => {
      this.navCtrl.setRoot('LoginPage');
    })
  }
}
