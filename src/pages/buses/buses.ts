import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BusServiceProvider} from '../../providers/bus-service/bus-service';

@Component({
  selector: 'page-buses',
  templateUrl: 'buses.html'
})

export class BusesPage {

    //Data structure to store incoming bus data
    busList = [];
    filteredBusList = [];

    //Constructor for home.ts, adds Provider
    constructor(public navCtrl: NavController, private busService: BusServiceProvider) {
      this.getTravel();
    }

    refreshList(newBusList){
      this.busList = newBusList;
      this.filteredBusList = newBusList;
    }

    //Get method for the busList
    getTravel() {
      this.busService.getTravel().subscribe(data => this.refreshList(data.member));
    }

    //Unused search function
    getItems(ev) {
      this.filteredBusList = this.busList;
      let val = ev.target.value;
      if (val && val.trim()) {
        this.filteredBusList = this.busList.filter((bus) => {
          return (bus.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    }


    /*//LEAFLET STUFF -- http://tphangout.com/ionic-3-leaflet-maps-geolocation-markers/
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
