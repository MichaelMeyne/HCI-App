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
  }
