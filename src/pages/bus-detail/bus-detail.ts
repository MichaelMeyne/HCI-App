import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BusServiceProvider} from '../../providers/bus-service/bus-service';

/**
 * Generated class for the BusDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-bus-detail',
  templateUrl: 'bus-detail.html',
})
export class BusDetailPage{

  bus = null;
  busTimes = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private busService: BusServiceProvider) {
    this.bus = navParams.get('bus');
  }

  ionViewDidEnter(){
    this.getTimetable();
  }

  //Get method for the busList
  getTimetable(onComplete: () => void = () => {}){
    this.busService.getTimetable(this.bus.atcocode)
    .finally(onComplete)
    .subscribe(data => this.refreshList(data.departures.all));
  }

  refreshList(newBusTimes){
    this.busTimes = [];
    if(newBusTimes == null){
      return;
    }
    this.busTimes = this.busTimes.concat(newBusTimes);
  }

  doRefresh(refresher) {
    this.getTimetable(() => {
      refresher.complete();
    });
  }

}
