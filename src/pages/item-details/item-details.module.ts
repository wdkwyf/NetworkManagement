import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ItemDetailsPage} from "./item-details";
import {NgxQRCodeModule} from "ngx-qrcode2";

@NgModule({
  declarations: [
    ItemDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetailsPage),
    NgxQRCodeModule,
  ],
})
export class ItemDetailsPageModule {
}

