import { Bus } from '../../models/bus'
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

  private url : string = "http://transportapi.com/v3/uk/places.json?query=&type=bus_stop&app_id=91676f07&app_key=e10dc441385db6f855e3e5ad29bcd6c8";

  constructor(private http: Http) {
    console.log('Hello BusServiceProvider Provider');
  }

  getTravel(){
    return this.http.get(this.url)
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
