import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {SelectorDataProvider} from "../../providers/selector-data/selector-data";
import {ImgServiceProvider} from "../../providers/img-service/img-service";



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
  cityColumns;//用于构造selector
  workplace = null;
  // workPlaceStr="上海市 市辖区 杨浦区";//选择的工作地
  jobColumns;//用于构造 selector
  jobStr = "服务业 市场销售";
  // editing = false;
  data;

  constructor(public navCtrl: NavController,private view: ViewController, public navParams: NavParams,private selectorData:SelectorDataProvider,private imgservice: ImgServiceProvider, public actionSheetCtrl: ActionSheetController) {
    this.cityColumns = this.selectorData.cities;
    this.jobColumns = this.selectorData.jobs;

  }

  closeModal() {

    this.view.dismiss(this.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditInfoPage');
    // this.getRequestContact();
  }

  ionViewWillLoad(){
    this.data = this.navParams.get('user');
  }

  // editInfo(){
  //   console.log("editInfo");
  //   this.editing = true;
  //   // document.getElementById('avatarDiv').setAttribute('tappable','true');
  //   document.getElementById('avatarDiv').addEventListener("click",evt => {this.changeAvatar();});
  // }

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
          this.data.avatar = this.imgservice.takePhoto();
        }
      }, {
        text: '从相册选择',
        role: 'chooseFromAlbum',
        handler: () => {
          this.data.avatar = this.imgservice.chooseFromAlbum();
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
    if(this.workplace==null){
      alert("请选择工作地");
      return;
    }
    // this.workPlaceArr = "";
    this.data.workPlaceStr = "";
    let workplaceArrTmp = this.workplace.split(' ');
    for(let k =0;k<workplaceArrTmp.length;k++){
      let j = 0;
      let a = this.cityColumns;
        for (j = 0; j < a[k].options.length; j++) {
          if (a[k].options[j].value === workplaceArrTmp[k]) {
            break;
          }
        }
      this.data.workPlaceStr = this.data.workPlaceStr + " " + (a[k].options[j].text);
      console.log(this.data.workPlaceStr);
    }
    //todo 更新数据库
    this.closeModal();


      //  a.forEachItem((level) => {level.options.filter((item) =>{
      //     return (item.value.toLowerCase().indexOf("110000") > -1);
      //   });
      // });


  }
  // getRequestContact(){
  //   this.selectorData.getCityList()
  //     .subscribe(res => {
  //       this.cityColumns = res;
  //
  //     }, error => {
  //       console.log(error);
  //     });
  // }

}
