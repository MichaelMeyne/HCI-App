import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import {Observable} from 'rxjs/Observable'

/*
  Generated class for the TravelServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TrainServiceProvider {

  private app_id = "91676f07";
  private app_key = "e10dc441385db6f855e3e5ad29bcd6c8";
  private place_type = "train_station";
  private default_lat = 52.6309;
  private default_lon = 1.2974;
  private min_lat = this.default_lat - 0.1;
  private max_lat = this.default_lat + 0.1;
  private min_lon = this.default_lon - 0.1;
  private max_lon = this.default_lon + 0.1;

  private url : string = `https://transportapi.com/v3/uk/places.json?app_id=${this.app_id}&app_key=${this.app_key}&max_lat=${this.max_lat}&max_lon=${this.max_lon}&min_lat=${this.min_lat}&min_lon=${this.min_lon}&type=${this.place_type}`;

  constructor(private http: Http) {
    console.log('Hello TrainServiceProvider Provider');
  }

  getTravel(){
    return this.http.get(this.url)
    .do(this.logResponse)
    .map(this.extractData)
    .catch(this.catchError)
  }

  private logResponse(res : Response){
    console.log(res);
  }

  private extractData(res : Response){
    return res.json();
  }

  private catchError(error : Response | any){
    console.log(error);
    return Observable.throw(error.json().error || "Server Error" );
  }
}
