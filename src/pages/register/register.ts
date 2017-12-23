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
  registerCredentials = {name: '', email: '', password: ''};

  constructor(public navCtrl: NavController,
              private auth: AuthServiceProvider,
              private alertCtrl: AlertController,
              public navParams: NavParams) {
  }

  public register() {
    this.auth.register(this.registerCredentials).subscribe(success => {
      if (success) {
        this.createSuccess = true;
        this.showPopup('注册成功','恭喜你创建用户成功!');
      } else {
        this.showPopup("注册失败", "创建用户失败");
      }
    }, error => {
      this.showPopup("注册失败", error);
    });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.setRoot('LoginPage');
            }
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
