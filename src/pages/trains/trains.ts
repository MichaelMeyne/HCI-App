import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TrainServiceProvider} from '../../providers/train-service/train-service';

@Component({
  selector: 'page-about',
  templateUrl: 'trains.html'
})
export class TrainsPage {

  trainList = [];
  filteredTrainList = [];

    constructor(public navCtrl: NavController, private trainService : TrainServiceProvider) {
      this.getTravel();
    }

    refreshList(newTrainList){
      this.trainList = newTrainList;
      this.filteredTrainList = newTrainList;
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
  }
