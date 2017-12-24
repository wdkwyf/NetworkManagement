import {Component} from '@angular/core';
import {ActionSheet, ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {ImgServiceProvider} from "../../providers/img-service/img-service";
import {ImagePicker} from "@ionic-native/image-picker";
import {Geolocation} from "@ionic-native/geolocation";

/**
 * Generated class for the AddNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-note',
  templateUrl: 'add-note.html',
})
export class AddNotePage {

  noteContent = "";
  public imgs = [];
  imageUri: string = '';

  constructor(private imgService: ImgServiceProvider,
              private actionSheetCtrl: ActionSheetController,
              private photoViewer: PhotoViewer,
              private imagePicker: ImagePicker,
              private geolocation: Geolocation,
              public navCtrl: NavController,
              public navParams: NavParams) {

  }

  getGPS() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error.message);
    });
  }

  selectImage() {
    let pictureOptions = {
      maximumImagesCount: 1,
    };
    this.imagePicker.hasReadPermission().then(res=>{
      console.log(res);
    })
    // this.imagePicker.getPictures(pictureOptions).then(results => {
    //   console.log(results[0]);
    //   // this.imageUri = results[0]
    // })
  }

  addPhoto() {
    this.presentActionSheet();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNotePage');
  }

  postNote() {
  }

  onFocus() {
    console.log("input focused");
  }

  public viewPhoto(i) {
    this.photoViewer.show(this.imgs[i], '拍摄照片')
  }

  postButtonClicked(){
    this.navCtrl.pop();
  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [{
        text: '拍照',
        role: 'takePhoto',
        handler: () => {
          this.imgs = this.imgService.takePicture();
        }
      }, {
        text: '从相册选择',
        role: 'chooseFromAlbum',
        handler: () => {
          this.imgs = this.imgService.chooseFromAlbum();
        }
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log("cancel");
        }
      }]
    });
    actionSheet.present().then(value => {
      return value;
    });
  }
}
