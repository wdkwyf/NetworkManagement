import {Component} from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {FileOpener} from "@ionic-native/file-opener";
import {NativeStorage} from "@ionic-native/native-storage";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  loginCredentials = {name: '', password: ''};

  constructor(public navCtrl: NavController,
              private fileOpener: FileOpener,
              private auth: AuthServiceProvider,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
  }

  public createAccount() {
    //for now
    this.fileOpener.open('path/to/file.pdf', 'application/pdf')
      .then(() => console.log('File is opened'))
      .catch(e => console.log('Error openening file', e));
    this.navCtrl.push('RegisterPage');

  }

  public login() {
    this.showLoading();
    this.auth.login(this.loginCredentials).subscribe(allowed => {
      if (allowed) {
        this.navCtrl.setRoot('ContactsPage');
      } else {
        this.showError('登录失败');
      }
    });

  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: '登录中，请稍后',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
