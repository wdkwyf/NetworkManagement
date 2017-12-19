import {Component} from '@angular/core';
import vcf from 'vcf';

import {IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';

import {ItemDetailsPage} from '../item-details/item-details';
import {CardServiceProvider} from "../../providers/card-service/card-service";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {isUndefined} from "ionic-angular/util/util";

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class CloudCardListPage {
  items: Array<string>;
  username: string;

  constructor(public navCtrl: NavController,
              private cardService: CardServiceProvider,
              private auth: AuthServiceProvider,
              public modalCtrl: ModalController,
              public navParams: NavParams) {

    this.auth.getUserName().subscribe(name => {
      this.username = name;
      if (this.username != this.auth.unlogin) {
        this.cardService.viewCloudCardName(this.username).subscribe(list => {
          console.log('name', this.username);
          this.items = list;
          console.log(this.items);
        });
      }
    });
  }

  itemTapped(event, item) {
    var card = new vcf().parse('BEGIN:VCARD\n' +
      'VERSION:2.1\n' +
      'REV:20171216T193121Z\n' +
      'X-GENERATOR:IntSig\n' +
      'X-IS-ANGLE:0\n' +
      'N;CHARSET=utf-8:吴;雨霏\n' +
      'X-IS-INFO:0,0,0,0,0,0,0,0;1,2,13\n' +
      'FN;CHARSET=utf-8:吴雨霏\n' +
      'X-IS-INFO:309,66,362,66,362,84,309,84;0,9,10,13\n' +
      'TEL;CELL;VOICE:18850510816\n' +
      'X-IS-INFO:81,125,167,125,167,135,81,135;6,13\n' +
      'TEL;WORK;VOICE:07915885308\n' +
      'X-IS-INFO:79,105,160,105,160,115,79,115;3,4,5,6,13\n' +
      'EMAIL;PREF;INTERNET:wuyufei@551a.com\n' +
      'X-IS-INFO:80,164,186,164,186,178,80,178;7,14,13\n' +
      'TITLE;CHARSET=utf-8:总经理\n' +
      'X-IS-INFO:367,66,405,66,405,84,367,84;9,16,11,10,0,13\n' +
      'TITLE;CHARSET=utf-8:General Manager\n' +
      'X-IS-INFO:308,50,392,50,392,62,308,62;9,16,11,10,0,13\n' +
      'ADR;WORK;PREF;CHARSET=utf-8:;;思明区厦禾路844号 中厦国际大厦15A;;;;\n' +
      'X-IS-INFO:81,54,185,54,185,85,81,85;11,13\n' +
      'LABEL;WORK;PREF;CHARSET=utf-8:思明区厦禾路844号 中厦国际大厦15A\n' +
      'X-IS-INFO:81,54,185,54,185,85,81,85;11,13\n' +
      'END:VCARD\n');
    console.log('card', card['data']['tel']);
    let modal = this.modalCtrl.create('ItemDetailsPage', {item: item});
    modal.present();
    // this.navCtrl.push('ItemDetailsPage', {
    //   item: item
    // });
  }
}

