import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TrainServiceProvider} from '../../providers/train-service/train-service';

/**
 * Generated class for the TrainDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-train-detail',
  templateUrl: 'train-detail.html',
})
export class TrainDetailPage {

  train = null;
  trainTimes = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public trainService : TrainServiceProvider) {
    this.train = navParams.get('train');
  }

  getTimetable(){
    this.trainService.getTimetable(this.train.station_code).subscribe(data => this.refreshList(data.departures));
  }

  ionViewDidLoad() {
    this.getTimetable();
  }

  refreshList(departures){
    this.trainTimes = [];
    if(departures == null || departures.all == null){
      return;
    }
    this.trainTimes = this.trainTimes.concat(departures.all);
  }
}
