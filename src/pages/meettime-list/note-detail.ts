import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";


@IonicPage()
@Component({
  selector: 'page-note-details',
  templateUrl: 'note-details.html',
})
export class NoteDetailPage {
  content: any;

  constructor(public http: HttpClient,
              public navCtrl: NavController,
              public navParams: NavParams) {
    this.content = this.navParams.get('content');
  }
  viewPerson(person){
    console.log('person is',person);
    this.navCtrl.push('PersonalInfoPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMeetTimePage');
  }


}
