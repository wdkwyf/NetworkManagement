import {Component} from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

@IonicPage()
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'home.html'
})
export class HomePage {
  username = '';
  email = '';
  private todo: FormGroup;

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController, private auth: AuthServiceProvider) {
    let info = this.auth.getUserInfo();
    this.username = info['name'];
    this.email = info['email'];
    // this.todo = this.formBuilder.group({
    //   userId: ['', Validators.required],
    //   password: ['', Validators.required],
    //   description: [''],
    // });
  }

  public logout() {
    this.auth.logout().subscribe(success => {
      this.navCtrl.setRoot('LoginPage');
    })
  }

  logForm() {
    console.log(this.todo.value)
  }
}
