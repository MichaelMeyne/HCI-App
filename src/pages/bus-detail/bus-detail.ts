import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.bus = navParams.get('bus');
  }

}
