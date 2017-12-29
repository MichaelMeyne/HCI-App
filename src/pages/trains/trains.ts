import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TrainServiceProvider} from '../../providers/train-service/train-service';
import { TrainDetailPage } from '../train-detail/train-detail';
import leaflet from 'leaflet';

@Component({
  selector: 'page-about',
  templateUrl: 'trains.html'
})
export class TrainsPage {

    trainList = [];
    filteredTrainList = [];
    showMap = true;
    trainMap = null;
    trainMarkerGroup = leaflet.featureGroup();
    mapOption = "Hide Map";

    constructor(public navCtrl: NavController, private trainService : TrainServiceProvider) {

    }

    refreshList(newTrainList){
      this.trainList = newTrainList;
      this.filteredTrainList = newTrainList;
      this.refreshMarkers();
    }

    getTravel(){
      this.trainService.getTravel().subscribe(data => this.refreshList(data.member));
    }

    //Unused search function
    getItems(ev) {
      this.filteredTrainList = this.trainList;
      let val = ev.target.value;
      if (val && val.trim()) {
        this.filteredTrainList = this.trainList.filter((train) => {
          //console.log(train.name);
          return (train.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    }

    openItem(train){
        this.navCtrl.push(TrainDetailPage, {
        train : train
      });
    }

    //LEAFLET STUFF -- http://tphangout.com/ionic-3-leaflet-maps-geolocation-markers/
    ionViewDidEnter() {
      if(this.trainMap == undefined){
        this.loadmap();
      }
      this.getTravel();
    }

    loadmap() {
      this.trainMap = leaflet.map("trainMap").fitWorld();
      leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
      }).addTo(this.trainMap);
      this.configureMap();
    }

    configureMap(){
      this.trainMap.locate({
        setView: true,
        maxZoom: 10
      }).on('locationfound', (e) => {
        this.addCurrentLocationMarker(e.latitude, e.longitude);
      }).on('locationerror', (err) => {
          alert(err.message);
      })
      this.trainMap.addLayer(this.trainMarkerGroup);
    }

    toggleMap() {
      this.showMap = !this.showMap;
      if(this.showMap){
        setTimeout(() => { this.loadmap(); this.getTravel(); }, 25);
        this.mapOption = "Hide Map";
      }
      else{
        this.mapOption = "Show Map";
      }

    }

    refreshMarkers(){
      if(this.trainMap == undefined){
        return;
      }
      this.trainMarkerGroup.clearLayers();
      this.filteredTrainList.forEach((train) => {
          this.addBusMarker(train);
      });
      this.flyToMarkers()
    }

    flyToMarkers(){
      if(this.filteredTrainList.length > 0){
        this.trainMap.flyToBounds(this.trainMarkerGroup.getBounds(), { padding : [50, 50] });
      } else {
        this.trainMap.flyToBounds([[this.trainService.min_lat, this.trainService.min_lon],
                              [this.trainService.max_lat, this.trainService.max_lon]], { padding : [50, 50] });
      }
    }

    addBusMarker(train){
      let marker: any = leaflet.marker([train.latitude, train.longitude]).on('click', () => {
        this.openItem(train);
      })
      this.trainMarkerGroup.addLayer(marker);
    }

    currentLocationIcon = leaflet.icon({
      iconUrl:  'assets/imgs/currentLocation.png',

      iconSize:     [50, 50], // size of the icon
      iconAnchor:   [25, 50], // point of the icon which will correspond to marker's location
    });

    addCurrentLocationMarker(latitude, longitude){
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([latitude, longitude], {icon: this.currentLocationIcon}).on('click', () => {
        alert('You Are Here');
      })
      markerGroup.addLayer(marker);
      this.trainMap.addLayer(markerGroup);
    }
  }
