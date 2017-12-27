import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TrainServiceProvider} from '../../providers/train-service/train-service';

@Component({
  selector: 'page-about',
  templateUrl: 'trains.html'
})
export class TrainsPage {

  trainList = [];

    constructor(public navCtrl: NavController, private trainService : TrainServiceProvider) {
      this.getTravel();
    }

    getTravel(){
      this.trainService.getTravel().subscribe((data:any) => this.trainList = data.member);
    }

    //Unused search function
    getItems(ev) {
      let val = ev.target.value;
      if (!val || !val.trim()) {
        this.trainList = [];
        return;
      }
      this.trainList = this.trainList.filter((train) => {
        return (train.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }
