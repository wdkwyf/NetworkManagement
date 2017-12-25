import { Component } from '@angular/core';
import {IonicPage, Modal, ModalController, ModalOptions, NavController, NavParams} from 'ionic-angular';
import {NoteServiceProvider} from "../../providers/note-service/note-service";

/**
 * Generated class for the NoteListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-note-list',
  templateUrl: 'note-list.html',
})
export class NoteListPage {
  username;
  contactName;
  noteList;

  constructor(public modal:ModalController,private noteService:NoteServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.username = this.navParams.get('username');
    this.contactName = this.navParams.get('contactName');
    noteService.getNoteListByNames(this.username,this.contactName).subscribe((data)=>{
      this.noteList = data;
    });

    console.log(this.username+"   "+this.contactName);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoteListPage');
  }

  createNoteClicked(){
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModal: Modal = this.modal.create('AddNotePage', { 'username':this.username,'contactName':this.contactName }, myModalOptions);

    myModal.present();

    myModal.onDidDismiss((data) => {
      console.log("I have dismissed.");
      console.log(data);

      if(data){
        this.noteList.push(data);
      }

    });

    myModal.onWillDismiss((data) => {
      console.log("I'm about to dismiss");
      console.log(data);
    });
    // this.navCtrl.push('AddNotePage',{'username':this.username,'contactName':this.contactName})

  }



}
