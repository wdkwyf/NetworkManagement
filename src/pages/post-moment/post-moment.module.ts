import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostMomentPage } from './post-moment';

@NgModule({
  declarations: [
    PostMomentPage,
  ],
  imports: [
    IonicPageModule.forChild(PostMomentPage),
  ],
})
export class PostMomentPageModule {}
