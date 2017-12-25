import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ImagePicker} from "@ionic-native/image-picker";
import {Geolocation} from "@ionic-native/geolocation";
import {HttpClient} from "@angular/common/http";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {CardServiceProvider} from "../../providers/card-service/card-service";

/**
 * Generated class for the AddMeetTimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-meettime',
  templateUrl: 'add-meettime.html',
})
export class AddMeetTimePage {
  username: string;
  noteContent = {imageUri: '', person: '', topic: ''};
  flag: string = '';
  location: string = '';
  private readonly postURL: string = 'http://120.79.42.137:8080/Entity/Ud7adca934ab4e/Card/Meettime/';

  constructor(private imagePicker: ImagePicker,
              private geolocation: Geolocation,
              private cardService: CardServiceProvider,
              private auth: AuthServiceProvider,
              public http: HttpClient,
              public navCtrl: NavController,
              public navParams: NavParams) {
    this.auth.getUserName().subscribe(name => {
      this.username = name;
    });
    this.getGPS();
  }

  getGPS() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.location = '纬度' + resp.coords.latitude + '\n' + '经度' + resp.coords.longitude;
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error.message);
    });
  }

  getTime() {
    let date = new Date();
    // 日期
    let day = date.toDateString();
    // 时间
    let time = date.toTimeString();
    return day + '--' + time;
  }

  selectImage() {
    let pictureOptions = {
      maximumImagesCount: 1,
    };
    this.imagePicker.getPictures(pictureOptions).then(results => {
      console.log(results[0]);
      this.noteContent.imageUri = results[0];
      this.flag = 'none';
    })
  }

  saveMeet() {
    console.log(this.noteContent.person);
    console.log(this.noteContent.topic);
    console.log(this.getTime());
    console.log(this.location);
    let body = {
      'username': this.username,
      'person': this.noteContent.person,
      'topic': this.noteContent.topic,
      'imageuri': this.noteContent.imageUri,
      'meettime': this.getTime(),
      'location': this.location
    };
    this.cardService.showLoading('正在创建中，请稍后');
    this.http.post(this.postURL, body).subscribe(data => {
      console.log('相遇时刻创建成功');
      this.navCtrl.setRoot('MeetTimeListPage');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMeetTimePage');
  }


}
