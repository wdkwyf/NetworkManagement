import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';
import {CardServiceProvider} from "../../providers/card-service/card-service";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

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
          console.log('list-name', this.username);
          this.items = list;
        });
      }
    });
  }

  itemTapped(event, item) {

    let modal = this.modalCtrl.create('ItemDetailsPage', {name: this.username, item: item});
    modal.present();
    // this.navCtrl.push('ItemDetailsPage', {
    //   item: item
    // });
  }
}

