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

  //LEAFLET STUFF -- http://tphangout.com/ionic-3-leaflet-maps-geolocation-markers/
  ionViewDidEnter() {
    if(this.map == undefined){
      this.loadmap();
    }
  }

  loadmap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
    this.configureMap();
  }

  configureMap(){
    this.addMarker(this.bus.latitude, this.bus.longitude);
    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      this.addMarker(e.latitude, e.longitude);
    }).on('locationerror', (err) => {
        alert(err.message);
    })
  }

  addMarker(latitude, longitude){
    let markerGroup = leaflet.featureGroup();
    let marker: any = leaflet.marker([latitude, longitude]).on('click', () => {
      alert('Marker clicked');
    })
    markerGroup.addLayer(marker);
    this.map.addLayer(markerGroup);
  }
}
