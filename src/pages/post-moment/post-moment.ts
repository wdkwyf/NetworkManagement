import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, ActionSheetController, AlertController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {ImgServiceProvider} from "../../providers/img-service/img-service";
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {MomentServiceProvider} from "../../providers/moment-service/moment-service";
import {AppConfig} from "../../app/app.config";

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

  img = null;// = [];
  data;
  momentContent='';
  momentTitle='';
  userInfo;
  constructor(private authService:AuthServiceProvider,private momentService:MomentServiceProvider,private photoViewer:PhotoViewer,private imgService:ImgServiceProvider,public navCtrl: NavController,private imgservice: ImgServiceProvider,  public navParams: NavParams,private view: ViewController, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController) {
    authService.getUserInfoByName(AppConfig.getUsername()).subscribe(userInfo=>{
      this.userInfo = userInfo;
    })
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
    this.view.dismiss();
  }

  postMoment(){
    console.log(this.userInfo)
    this.momentService.postMoment(this.userInfo['id'],this.momentTitle,this.momentContent,this.img).subscribe(data=>{
      this.view.dismiss(data);
    })
  }


  public viewPhoto(i){
    this.photoViewer.show(this.img, '拍摄照片')
  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [{
        text: '拍照',
        role: 'takePhoto',
        handler: () => {
          this.img = this.imgService.takePicture();
        }
      }, {
        text: '从相册选择',
        role: 'chooseFromAlbum',
        handler: () => {
          this.img = this.imgService.chooseFromAlbum();
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
