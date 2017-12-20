import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditInfoPage } from './edit-info';
import {MultiPickerModule} from 'ion-multi-picker';


@NgModule({
  declarations: [
    EditInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditInfoPage),
    MultiPickerModule,
  ],
})
export class EditInfoPageModule {}
