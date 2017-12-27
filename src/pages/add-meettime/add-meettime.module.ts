import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMeetTimePage } from './add-meettime';



@NgModule({
  declarations: [
    AddMeetTimePage,
  ],
  imports: [
    IonicPageModule.forChild(AddMeetTimePage),
  ],
})
export class AddNotePageModule {}
