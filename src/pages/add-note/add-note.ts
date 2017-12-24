import { Component } from '@angular/core';
import {
  ActionSheet, ActionSheetController, IonicPage, Loading, LoadingController, NavController, NavParams,
  ViewController
} from 'ionic-angular';
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {Camera} from "@ionic-native/camera";
import {ImgServiceProvider} from "../../providers/img-service/img-service";
import {NoteServiceProvider} from "../../providers/note-service/note-service";

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
  noteTitle = "";
  public imgs = [];
  username;
  contactName;
  loading:Loading;

  constructor(private loadingCtrl:LoadingController,public view:ViewController,private noteService:NoteServiceProvider,private imgService:ImgServiceProvider,private actionSheetCtrl:ActionSheetController,private photoViewer: PhotoViewer,private camera:Camera,public navCtrl: NavController, public navParams: NavParams) {
    this.username = navParams.get('username');
    this.contactName = navParams.get('contactName');
  }

  addPhoto(){
    this.presentActionSheet();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNotePage');
  }

  closeModal() {
    this.view.dismiss();
  }

  // postNote(){}

  onFocus(){
    console.log("input focused");
  }

  public viewPhoto(i){
    this.photoViewer.show(this.imgs[i], '拍摄照片')
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: '请稍后',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  postButtonClicked(){
    this.showLoading();
    this.noteService.postNote(this.imgs,this.noteTitle,this.noteContent,this.username,this.contactName).subscribe(data=>{
      this.loading.dismiss();
      this.view.dismiss(data);
    });
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


  // public takePicture(){
  //   //相机参数配置
  //   const options = {
  //     quality: 50,  //照片质量，1-100，默认50
  //     destinationType: this.camera.DestinationType.DATA_URL,  //返回的数据类型，默认DATA_URL
  //     enodingType: this.camera.EncodingType.JPEG,  //照片格式，默认JPEG，还有PNG可选
  //     mediaType: this.camera.MediaType.PICTURE,  //媒体类型，默认PICTURE->照片，还有VIDEO等可以选
  //     sourceType: this.camera.PictureSourceType.CAMERA  //来源类型，默认CAMERA->相机，还有PHOTOLIBRARY->相册等可以选
  //   }
  //
  //   this.camera.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64:
  //     this.imgs.push('data:image/jpeg;base64,' + imageData);
  //     console.log(this.imgs)
  //   }, (err) => {
  //     // Handle error
  //     console.log(err)
  //   });
  // }
  // public chooseFromAlbum(){
  //   //相机参数配置
  //   const options = {
  //     quality: 50,  //照片质量，1-100，默认50
  //     destinationType: this.camera.DestinationType.DATA_URL,  //返回的数据类型，默认DATA_URL
  //     enodingType: this.camera.EncodingType.JPEG,  //照片格式，默认JPEG，还有PNG可选
  //     mediaType: this.camera.MediaType.PICTURE,  //媒体类型，默认PICTURE->照片，还有VIDEO等可以选
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY//来源类型，默认CAMERA->相机，还有PHOTOLIBRARY->相册等可以选
  //   }
  //
  //   this.camera.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64:
  //     this.imgs.push( 'data:image/jpeg;base64,' + imageData);
  //     console.log(this.imgs)
  //   }, (err) => {
  //     // Handle error
  //     console.log(err)
  //   });
  // }



}
