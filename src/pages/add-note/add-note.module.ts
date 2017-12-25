import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {NgxQRCodeModule} from "ngx-qrcode2";
import {AddNotePage} from "./add-note";

@NgModule({
  declarations: [
    AddNotePage,
  ],
  imports: [
    IonicPageModule.forChild(AddNotePage),
    NgxQRCodeModule,
  ],
})
export class AddNotePageModule {
}

