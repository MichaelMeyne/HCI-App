import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//Each .ts file receives its own unique provider
import { TrainServiceProvider } from '../../providers/train-service/train-service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  //Data structure to store incoming bus data
  trainList = [];

  //Constructor for home.ts, adds Provider
  constructor(public navCtrl: NavController, private trainService: TrainServiceProvider) {
    this.getTravel();
  }

  getTravel() {
    this.trainService.getTravel().subscribe((data: any) => this.trainList = data.member);
  }

  //Unused search function
  getItems(ev) {
    this.getTravel();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.trainList = this.trainList.filter((item) => {
        //return (String(item).toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}


