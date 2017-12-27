import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//Each .ts file receives its own unique provider
import { BusServiceProvider } from '../../providers/bus-service/bus-service';
import leaflet from 'leaflet';

interface Bus{
  type : string;
  name : string;
  description : string;
  latitude : number;
  longitude : number;
  accuracy : number;
  atcocode : string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  //Data structure to store incoming bus data
  busList = [];
  search: string = '';
  //private map: any;


  //Constructor for home.ts, adds Provider
  constructor(public navCtrl: NavController, private busService: BusServiceProvider) {
    this.getTravel();
  }

  //Get method for the busList
  getTravel() {
    this.busService.getTravel().subscribe((data => this.busList = data.member));


  }

  //Unused filter function for searching the list
  filterTravel() {
    this.busList = this.busList.filter((bus) => { return true; });
  }

  /*
  .controller("HomeCtrl", function($scope){

  });*/

  //Unused search function
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.busList = [];
      return;
    }
    this.busList = this.busList.filter((bus) => {
      return (bus.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
    });
  }
  /*
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
    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
        alert('Marker clicked');
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      }).on('locationerror', (err) => {
        alert(err.message);
    })
  }*/
}
