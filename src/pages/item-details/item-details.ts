import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {vcf} from 'vcf';
import {CardServiceProvider} from "../../providers/card-service/card-service";
import {QQSDK, QQShareOptions} from "@ionic-native/qqsdk";

@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;
  cardInfo: { title: string, email: string, workphone: string, mobilephone: string, address: string, id: string } = {
    title: '',
    email: '',
    workphone: '',
    mobilephone: '',
    address: '',
    id: '',
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private cardService: CardServiceProvider,
              private qq: QQSDK,
              private viewCtrl: ViewController) {
    // If we navigated to this page, we will have an item available as a nav param
    let username = this.navParams.get('name');
    let friendname = this.navParams.get('item');
    this.selectedItem = friendname;
    this.cardService.viewDetailCard(username, friendname).subscribe(cardInfo => {
      this.cardInfo = cardInfo;
    });
  }

  public downloadCard() {
    // open a vcf file means save the card to user
    this.cardService.downloadCard(this.selectedItem).subscribe();
  }

  public shareQQ() {
    const clientOptions: QQShareOptions = {
      client: this.qq.ClientType.QQ,
      scene: this.qq.Scene.QQ,
      title: '分享名片',
      url: 'http://120.79.42.137:8080/file/Ud7adca934ab4e/Card/Cards/1513695710642',
      image: 'https://cordova.apache.org/static/img/cordova_bot.png',
      description: 'This is  Cordova QQ share description',
      flashUrl:  'http://stream20.qqmusic.qq.com/30577158.mp3',
    };
    this.qq.shareNews(clientOptions).then(() => {
      console.log('shareNews success');
    })

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
