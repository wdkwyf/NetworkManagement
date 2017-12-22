import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {CloudCardListPage} from "./list";

@NgModule({
  declarations: [
    CloudCardListPage,
  ],
  imports: [
    IonicPageModule.forChild(CloudCardListPage),
  ],
})
export class CloudCardListPageModule {}

