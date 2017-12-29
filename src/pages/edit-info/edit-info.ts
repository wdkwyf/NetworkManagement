import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {SelectorDataProvider} from "../../providers/selector-data/selector-data";
import {ImgServiceProvider} from "../../providers/img-service/img-service";
import {ContactServiceProvider} from "../../providers/contact-service/contact-service";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";



/**
 * Generated class for the EditInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-info',
  templateUrl: 'edit-info.html',
})
export class EditInfoPage {

  // avatar = "../assets/imgs/avatar.jpg";
  avatar= [];
  cityColumns;//用于构造selector
  workplace = null;
  // workPlaceStr="上海市 市辖区 杨浦区";//选择的工作地
  jobColumns;//用于构造 selector
  jobStr = "服务业 市场销售";
  // editing = false;
  user;
  private readonly avatarURL: string = 'http://120.79.42.137:8080/file/Ud7adca934ab4e/Card/Userinfo/';

  constructor(private authService:AuthServiceProvider,public navCtrl: NavController,private view: ViewController, public navParams: NavParams,private selectorData:SelectorDataProvider,private imgservice: ImgServiceProvider, public actionSheetCtrl: ActionSheetController) {
    this.cityColumns = this.selectorData.cities;
    this.jobColumns = this.selectorData.jobs;
    this.user = this.navParams.get('user');


  }

  closeModal() {
    this.view.dismiss(this.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditInfoPage');
  }

  ionViewWillLoad(){
    this.user = this.navParams.get('user');
  }


  changeAvatar(){
    console.log("change avatar");
    this.presentActionSheet();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [{
        text: '拍照',
        role: 'takePhoto',
        handler: () => {
          this.avatar = this.imgservice.takePicture();
        }
      }, {
        text: '从相册选择',
        role: 'chooseFromAlbum',
        handler: () => {
          this.avatar = this.imgservice.chooseFromAlbum();
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

  saveBtnClicked() {
    this.user.workplace = "";
    if(this.workplace){
      let workplaceArrTmp = this.workplace.split(' ');
      for(let k =0;k<workplaceArrTmp.length;k++){
        let j = 0;
        let a = this.cityColumns;
        for (j = 0; j < a[k].options.length; j++) {
          if (a[k].options[j].value === workplaceArrTmp[k]) {
            break;
          }
        }
        this.user.workplace = this.user.workplace + " " + (a[k].options[j].text);
        console.log(this.user.workplace);
      }
    }
    // //todo 更新数据库
    this.authService.updateUserInfo(this.user,this.avatar[0]).subscribe(data=>{
      console.log(data);
      if(this.avatar[0]){
        this.user['hasavatar'] = 1;
      }
      this.closeModal();
    });

  }


}
