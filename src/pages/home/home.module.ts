import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import {NgxQRCodeModule} from "ngx-qrcode2";

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    NgxQRCodeModule
  ],
})
export class HomePageModule {}
