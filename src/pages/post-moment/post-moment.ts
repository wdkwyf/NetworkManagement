import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, ActionSheetController, AlertController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {ImgServiceProvider} from "../../providers/img-service/img-service";
import {PhotoViewer} from "@ionic-native/photo-viewer";

/**
 * Generated class for the PostMomentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-moment',
  templateUrl: 'post-moment.html',
})
export class PostMomentPage {

  imgs = [];
  data;
  postContent;
  constructor(private photoViewer:PhotoViewer,private imgService:ImgServiceProvider,public navCtrl: NavController,private imgservice: ImgServiceProvider,  public navParams: NavParams,private view: ViewController, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController) {
  }

  addPhoto(){
    this.presentActionSheet();
  }

  onFocus(){
    console.log("input focused");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostMomentPage');
  }
  ionViewWillLoad() {
    this.data = this.navParams.get('data');
    console.log(this.data);
  }

  closeModal() {
    const data = {
      name: 'John Doe',
      occupation: 'Milkman'
    };
    this.view.dismiss(data);
  }


  public viewPhoto(i){
    this.photoViewer.show(this.imgs[i], '拍摄照片')
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
