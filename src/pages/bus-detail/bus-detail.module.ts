import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusDetailPage } from './bus-detail';

@NgModule({
  declarations: [
    BusDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BusDetailPage),
  ],
})
export class BusDetailPageModule {}
