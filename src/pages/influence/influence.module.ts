import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfluencePage } from './influence';
import {ChartsModule} from "ng2-charts";

@NgModule({
  declarations: [
    InfluencePage,
  ],
  imports: [
    IonicPageModule.forChild(InfluencePage),
    ChartsModule
  ],
})
export class InfluencePageModule {}
