import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root: any = 'ContactsPage';
  tab2Root: any = 'MessagePage';
  tab3Root: any = 'CommunityPage';
  tab4Root: any = 'PersonalInfoPage';
  username: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
