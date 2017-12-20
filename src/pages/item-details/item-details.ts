import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {vcf} from 'vcf';
import {CardServiceProvider} from "../../providers/card-service/card-service";

@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;
  cardInfo: { title: string, email: string, workphone: string, mobilephone: string, address: string } = {
    title: '',
    email: '',
    workphone: '',
    mobilephone: '',
    address: ''
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private cardService: CardServiceProvider,
              private viewCtrl: ViewController) {
    // If we navigated to this page, we will have an item available as a nav param
    let username = this.navParams.get('name');
    let friendname = this.navParams.get('item');
    this.selectedItem = friendname;
    this.cardService.viewDetailCard(username, friendname).subscribe(cardInfo => {
      this.cardInfo = cardInfo;
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
