import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {vcf} from 'vcf';
import lodash from 'lodash';

@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    console.log('selected item',this.selectedItem);
    console.log(Component);
    lodash.capitalize('hurray, the lib works!');
  }
  sdk(){
    console.log()
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
