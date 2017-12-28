import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BusServiceProvider} from '../../providers/bus-service/bus-service';
import leaflet from 'leaflet';

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

  refreshList(newBusTimes){
    this.busTimes = [];
    if(newBusTimes == null){
      return;
    }
    Object.entries(newBusTimes).forEach(([routeName, routeTimes]) =>
    {this.busTimes = this.busTimes.concat(routeTimes)});
    console.log(this.busTimes);
  }

  //Get method for the busList
  getTimetable(){
    this.busService.getTimetable(this.bus.atcocode).subscribe(data => this.refreshList(data.departures));
  }
}
