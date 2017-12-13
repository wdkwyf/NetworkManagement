import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = {email: '', password: ''};

  constructor(public navCtrl: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController, public navParams: NavParams) {
  }

  public register() {
    this.auth.register(this.registerCredentials).subscribe(success => {
      if (success) {
        this.createSuccess = true;
      } else {

      }
    }, error => {

    });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title:title,
      subTitle:text,
      buttons:[
        {
          text:'OK',
          handler:data=>{
            if(this.createSuccess){
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    })
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
