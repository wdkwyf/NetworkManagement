import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {FileTransfer, FileTransferObject} from "@ionic-native/file-transfer";
import {AlertController, NavController} from "ionic-angular";
import {FileChooser} from "@ionic-native/file-chooser";
import {File} from "@ionic-native/file";
import {FileOpener} from "@ionic-native/file-opener";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the CardServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CardServiceProvider {
  private readonly getAllFriendNames: string = 'http://120.79.42.137:8080/Entity/Ud7adca934ab4e/Card/Cards/?Cards.username=';

  constructor(public http: HttpClient,
              private camera: Camera,
              private transfer: FileTransfer,
              private fileOpener: FileOpener,
              private file: File,) {
    console.log('Hello CardServiceProvider Provider');
  }

  public scanCard(username) {
    const cardScannerURL: string = "http://bcr2.intsig.net/BCRService/BCR_VCF2?user=wuyufei@sjtu.edu.cn&pass=TC6ELKF3HMKCCCBL&lang=15";
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    let isScanSuccess = false;
    return Observable.create(observer => {
      this.camera.getPicture(options).then(imageData => {
        const fileTransfer: FileTransferObject = this.transfer.create();
        fileTransfer.upload(imageData, cardScannerURL).then(data => {
          let timeNow = new Date().getTime();
          console.log(timeNow);
          let VCFName = username + timeNow + '.vcf';
          this.file.writeFile(this.file.externalDataDirectory, VCFName, data.response).then((success) => {
            console.log('write vcf file success: ' + VCFName);
            console.log(this.file.externalDataDirectory + VCFName);
            // open and add system contacts
            this.fileOpener.open((this.file.externalDataDirectory + VCFName), 'text/x-vcard').then(() => {
                isScanSuccess = true;
                observer.next(isScanSuccess);
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


    // return isScanSuccess;
    // if (isScanSuccess) {
    //   //ask if user want to search user according to this business card.
    //   console.log()
    //   this.showConfirm();
    // }
  }

  public uploadCard(userName, friendName) {

  }

  public viewCloudCardName(username) {
    let list: Array<string>=[];
    return Observable.create(observer=>{
      this.http.get(this.getAllFriendNames + username).subscribe(data => {
        data['Cards'].forEach(value => {
          list.push(value['friendname']);
        });
        observer.next(list);
        observer.complete();
      });
    });

  }


}
