import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BusServiceProvider} from '../../providers/bus-service/bus-service';
import { BusDetailPage } from '../bus-detail/bus-detail';
import leaflet from 'leaflet';

@Component({
  selector: 'page-buses',
  templateUrl: 'buses.html'
})

export class BusesPage {

    //Data structure to store incoming bus data
    busList = [];
    filteredBusList = [];
    map = null;
    busMarkerGroup = leaflet.featureGroup();

    //Constructor for home.ts, adds Provider
    constructor(public navCtrl: NavController, private busService: BusServiceProvider) {
      this.getTravel();
    }

    refreshList(newBusList){
      this.busList = newBusList;
      this.filteredBusList = newBusList;
      this.refreshMarkers();
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
      this.refreshMarkers();
    }

    openItem(bus){
        this.navCtrl.push(BusDetailPage, {
        bus : bus
      });
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
      this.map.locate({
        setView: true,
        maxZoom: 10
      }).on('locationfound', (e) => {
        this.addCurrentLocationMarker(e.latitude, e.longitude);
      }).on('locationerror', (err) => {
          alert(err.message);
      })
      this.map.addLayer(this.busMarkerGroup);
    }

    refreshMarkers(){
      this.busMarkerGroup.clearLayers();
      this.filteredBusList.forEach((bus) => {
          this.addBusMarker(bus);
      });
    }

    addBusMarker(bus){
      let marker: any = leaflet.marker([bus.latitude, bus.longitude]).on('click', () => {
        this.openItem(bus);
      })
      this.busMarkerGroup.addLayer(marker);
    }

    currentLocationIcon = L.icon({
      iconUrl:  '../../assets/imgs/currentLocation.png',

      iconSize:     [50, 50], // size of the icon
      iconAnchor:   [25, 50], // point of the icon which will correspond to marker's location
    });

    addCurrentLocationMarker(latitude, longitude){
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([latitude, longitude], {icon: this.currentLocationIcon}).on('click', () => {
        alert('You Are Here');
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
    }
}
