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
export class BusServiceProvider {

  private app_id = "91676f07";
  private app_key = "e10dc441385db6f855e3e5ad29bcd6c8";
  private place_type = "bus_stop";
  private default_lat = 52.6309;
  private default_lon = 1.2974;
  min_lat = this.default_lat - 0.1;
  max_lat = this.default_lat + 0.1;
  min_lon = this.default_lon - 0.1;
  max_lon = this.default_lon + 0.1;

  private stopUrl : string = `https://transportapi.com/v3/uk/places.json?app_id=${this.app_id}&app_key=${this.app_key}&max_lat=${this.max_lat}&max_lon=${this.max_lon}&min_lat=${this.min_lat}&min_lon=${this.min_lon}&type=${this.place_type}`;
  private timetableUrl(atcocode){
    return `https://transportapi.com/v3/uk/bus/stop/${atcocode}/live.json?app_id=${this.app_id}&app_key=${this.app_key}&group=no&nextbuses=no`;
  }

  constructor(private http: Http) {
    console.log('Hello BusServiceProvider Provider');
  }

  getTravel(){
    return this.http.get(this.stopUrl)
    .do(this.logResponse)
    .map(res => res.json())
    .catch(this.catchError)
  }

  getTimetable(atcocode){
    return this.http.get(this.timetableUrl(atcocode))
    .do(this.logResponse)
    .map(res => res.json())
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
