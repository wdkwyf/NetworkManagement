import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeetTimeListPage } from './meettime-list';

@NgModule({
  declarations: [
    MeetTimeListPage,
  ],
  imports: [
    IonicPageModule.forChild(MeetTimeListPage),
  ],
})
export class NoteListPageModule {}
