import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {vcf} from 'vcf';
import {CardServiceProvider} from "../../providers/card-service/card-service";
import {QQSDK, QQShareOptions} from "@ionic-native/qqsdk";
import {File} from "@ionic-native/file";
import {Toast} from "@ionic-native/toast";

declare var qrcode;

@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
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
  createdCode = null;
  scannedCode = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private cardService: CardServiceProvider,
              private qq: QQSDK,
              private plt: Platform,
              private toast: Toast,
              private file: File,
              private viewCtrl: ViewController) {
    // If we navigated to this page, we will have an item available as a nav param
    let username = this.navParams.get('name');
    let friendname = this.navParams.get('item');
    this.selectedItem = friendname;
    this.cardService.viewDetailCard(username, friendname).subscribe(cardInfo => {
      this.cardInfo = cardInfo;
    });
  }

  public saveCard() {
    // open a vcf file means save the card to user
    this.cardService.saveCard(this.selectedItem).subscribe();
  }

  /*
  Generate QR scan and share with QQ
  */
  public shareQQ() {
    // let url = this.file.externalCacheDirectory + 'tmp-' + this.selectedItem + '.vcf';
    let img = document.evaluate('//ngx-qrcode/div/img', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
    let base64 = img['src'].split(',')[1];
    const clientOptions: QQShareOptions = {
      client: this.qq.ClientType.QQ,
      scene: this.qq.Scene.QQ,
      title: '分享名片',
      image: base64,
      description: '向您分享了一张名片：'+this.selectedItem,
    };
    this.qq.shareImage(clientOptions).then(() => {
      console.log('share image success');
    })
  }

  createCode() {
    this.createdCode = this.cardService.shareCardURL;
    console.log(this.createdCode);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
