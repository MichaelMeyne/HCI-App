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

    return Observable.of({
      request_time: "2017-12-27T11:13:00+00:00",
      source: "NaPTAN",
      acknowledgements: "Contains DfT NaPTAN bus stops data",
      member: [
        {
          "type": "bus_stop",
          "name": "Royal Oak - SE-bound",
          "description": "Portway",
          "latitude": 52.10825,
          "longitude": -2.75609,
          "accuracy": 20,
          "atcocode": "2090A20299"
        },
        {
          "type": "bus_stop",
          "name": "Lion Farm - NW-bound",
          "description": "Portway",
          "latitude": 52.10173,
          "longitude": -2.7501,
          "accuracy": 20,
          "atcocode": "2090A20301"
        },
        {
          "type": "bus_stop",
          "name": "Lion Farm - SE-bound",
          "description": "Portway",
          "latitude": 52.10177,
          "longitude": -2.74991,
          "accuracy": 20,
          "atcocode": "2090A20303"
        },
        {
          "type": "bus_stop",
          "name": "Wergins Bridge - N-bound",
          "description": "Sutton St Nicholas",
          "latitude": 52.09863,
          "longitude": -2.68866,
          "accuracy": 20,
          "atcocode": "2090A20305"
        },
        {
          "type": "bus_stop",
          "name": "Wergins Bridge - S-bound",
          "description": "Sutton St Nicholas",
          "latitude": 52.0987,
          "longitude": -2.68833,
          "accuracy": 20,
          "atcocode": "2090A20307"
        },
        {
          "type": "bus_stop",
          "name": "John Masefield School - E-bound",
          "description": "Ledbury",
          "latitude": 52.03249,
          "longitude": -2.423,
          "accuracy": 20,
          "atcocode": "2090A203100"
        },
        {
          "type": "bus_stop",
          "name": "The Vauld - W-bound",
          "description": "Litmarsh",
          "latitude": 52.14138,
          "longitude": -2.68568,
          "accuracy": 20,
          "atcocode": "2090A20311"
        },
        {
          "type": "bus_stop",
          "name": "The Vauld - E-bound",
          "description": "Litmarsh",
          "latitude": 52.14152,
          "longitude": -2.68563,
          "accuracy": 20,
          "atcocode": "2090A20313"
        },
        {
          "type": "bus_stop",
          "name": "Broadfield Vineyard - N-bound",
          "description": "Saffron's Cross",
          "latitude": 52.17397,
          "longitude": -2.6739,
          "accuracy": 20,
          "atcocode": "2090A20319"
        },
        {
          "type": "bus_stop",
          "name": "Broadfield Vineyard - S-bound",
          "description": "Saffron's Cross",
          "latitude": 52.17382,
          "longitude": -2.67367,
          "accuracy": 20,
          "atcocode": "2090A20321"
        }
      ]
    })
    .do(this.logResponse)
    .catch(this.catchError);
    /*
    return this.http.get(this.stopUrl)
    .do(this.logResponse)
    .map(res => res.json())
    .catch(this.catchError)*/
  }

  getTimetable(atcocode){
    return Observable.of({
      atcocode: "2900N12248",
      smscode: "NFODJDTG",
      request_time: "2017-12-28T15:07:04Z",
      name: "Tombland (Stop CP)",
      stop_name: "Tombland",
      bearing: "S",
      indicator: "Stop CP",
      locality: "Norwich",
      departures: {
        "all": [
          {
            "mode": "bus",
            "line": "36",
            "line_name": "36",
            "direction": "City Centre,St Step",
            "operator": "FECS",
            "date": "2017-12-28",
            "expected_departure_date": "2017-12-28",
            "aimed_departure_time": "15:07",
            "expected_departure_time": "15:07",
            "best_departure_estimate": "15:07",
            "source": "VIX",
            "dir": "inbound",
            "id": "https://transportapi.com/v3/uk/bus/route/FECS/36/inbound/2900N12248/2017-12-28/15:07/timetable.json?app_id=91676f07&app_key=e10dc441385db6f855e3e5ad29bcd6c8",
            "operator_name": "First in Norfolk & Suff"
          },
          {
            "mode": "bus",
            "line": "22",
            "line_name": "22",
            "direction": "University,Universi",
            "operator": "FECS",
            "date": "2017-12-28",
            "expected_departure_date": "2017-12-28",
            "aimed_departure_time": "15:07",
            "expected_departure_time": "15:07",
            "best_departure_estimate": "15:07",
            "source": "VIX",
            "dir": "outbound",
            "id": "https://transportapi.com/v3/uk/bus/route/FECS/22/outbound/2900N12248/2017-12-28/15:07/timetable.json?app_id=91676f07&app_key=e10dc441385db6f855e3e5ad29bcd6c8",
            "operator_name": "First in Norfolk & Suff"
          },
          {
            "mode": "bus",
            "line": "11",
            "line_name": "11",
            "direction": "Forecourt (Norfolk & Norwich University Hospital)",
            "operator": "FECS",
            "operator_name": "First in Norfolk & Suff",
            "date": "2017-12-28",
            "aimed_departure_time": "15:07",
            "expected_departure_date": null,
            "expected_departure_time": null,
            "best_departure_estimate": "15:07",
            "dir": "inbound",
            "id": "https://transportapi.com/v3/uk/bus/route/FECS/11/inbound/2900N12248/2017-12-28/15:07/timetable.json?app_id=91676f07&app_key=e10dc441385db6f855e3e5ad29bcd6c8",
            "source": "Traveline timetable (nextbuses disabled)"
          },
          {
            "mode": "bus",
            "line": "37",
            "line_name": "37",
            "direction": "Mulbarton,Cuckoofie",
            "operator": "FECS",
            "date": "2017-12-28",
            "expected_departure_date": "2017-12-28",
            "aimed_departure_time": "15:17",
            "expected_departure_time": "15:14",
            "best_departure_estimate": "15:14",
            "source": "VIX",
            "dir": "inbound",
            "id": "https://transportapi.com/v3/uk/bus/route/FECS/37/inbound/2900N12248/2017-12-28/15:17/timetable.json?app_id=91676f07&app_key=e10dc441385db6f855e3e5ad29bcd6c8",
            "operator_name": "First in Norfolk & Suff"
          },
          {
            "mode": "bus",
            "line": "502",
            "line_name": "502",
            "direction": "Harford Park & Ride (Harford)",
            "operator": "KCTB",
            "operator_name": "Konectbus",
            "date": "2017-12-28",
            "aimed_departure_time": "15:14",
            "expected_departure_date": null,
            "expected_departure_time": null,
            "best_departure_estimate": "15:14",
            "dir": "inbound",
            "id": "https://transportapi.com/v3/uk/bus/route/KCTB/502/inbound/2900N12248/2017-12-28/15:14/timetable.json?app_id=91676f07&app_key=e10dc441385db6f855e3e5ad29bcd6c8",
            "source": "Traveline timetable (nextbuses disabled)"
          },
          {
            "mode": "bus",
            "line": "501",
            "line_name": "501",
            "direction": "Park & Ride (Thickthorn)",
            "operator": "KCTB",
            "operator_name": "Konectbus",
            "date": "2017-12-28",
            "aimed_departure_time": "15:15",
            "expected_departure_date": null,
            "expected_departure_time": null,
            "best_departure_estimate": "15:15",
            "dir": "inbound",
            "id": "https://transportapi.com/v3/uk/bus/route/KCTB/501/inbound/2900N12248/2017-12-28/15:15/timetable.json?app_id=91676f07&app_key=e10dc441385db6f855e3e5ad29bcd6c8",
            "source": "Traveline timetable (nextbuses disabled)"
          },
          {
            "mode": "bus",
            "line": "12",
            "line_name": "12",
            "direction": "Norfolk and Norwich",
            "operator": "FECS",
            "date": "2017-12-28",
            "expected_departure_date": "2017-12-28",
            "aimed_departure_time": "15:21",
            "expected_departure_time": "15:20",
            "best_departure_estimate": "15:20",
            "source": "VIX",
            "dir": "inbound",
            "id": "https://transportapi.com/v3/uk/bus/route/FECS/12/inbound/2900N12248/2017-12-28/15:21/timetable.json?app_id=91676f07&app_key=e10dc441385db6f855e3e5ad29bcd6c8",
            "operator_name": "First in Norfolk & Suff"
          },
          {
            "mode": "bus",
            "line": "39A",
            "line_name": "39A",
            "direction": "Hall Road,Asda",
            "operator": "FECS",
            "date": "2017-12-28",
            "expected_departure_date": "2017-12-28",
            "aimed_departure_time": "15:23",
            "expected_departure_time": "15:20",
            "best_departure_estimate": "15:20",
            "source": "VIX",
            "dir": "inbound",
            "id": "https://transportapi.com/v3/uk/bus/route/FECS/39A/inbound/2900N12248/2017-12-28/15:23/timetable.json?app_id=91676f07&app_key=e10dc441385db6f855e3e5ad29bcd6c8",
            "operator_name": "First in Norfolk & Suff"
          },
          {
            "mode": "bus",
            "line": "X44",
            "line_name": "X44",
            "direction": "Bus Station (Norwich City Centre)",
            "operator": "SNDR",
            "operator_name": "Sanders Coaches",
            "date": "2017-12-28",
            "aimed_departure_time": "15:20",
            "expected_departure_date": null,
            "expected_departure_time": null,
            "best_departure_estimate": "15:20",
            "dir": "inbound",
            "id": "https://transportapi.com/v3/uk/bus/route/SNDR/X44/inbound/2900N12248/2017-12-28/15:20/timetable.json?app_id=91676f07&app_key=e10dc441385db6f855e3e5ad29bcd6c8",
            "source": "Traveline timetable (nextbuses disabled)"
          },
          {
            "mode": "bus",
            "line": "21",
            "line_name": "21",
            "direction": "Norfolk and Norwich",
            "operator": "FECS",
            "date": "2017-12-28",
            "expected_departure_date": null,
            "aimed_departure_time": "15:22",
            "expected_departure_time": null,
            "best_departure_estimate": "15:22",
            "source": "VIX",
            "dir": "outbound",
            "id": "https://transportapi.com/v3/uk/bus/route/FECS/21/outbound/2900N12248/2017-12-28/15:22/timetable.json?app_id=91676f07&app_key=e10dc441385db6f855e3e5ad29bcd6c8",
            "operator_name": "First in Norfolk & Suff"
          },
          {
            "mode": "bus",
            "line": "28",
            "line_name": "28",
            "direction": "City Centre,St Step",
            "operator": "FECS",
            "date": "2017-12-28",
            "expected_departure_date": "2017-12-28",
            "aimed_departure_time": "15:21",
            "expected_departure_time": "15:22",
            "best_departure_estimate": "15:22",
            "source": "VIX",
            "dir": "outbound",
            "id": "https://transportapi.com/v3/uk/bus/route/FECS/28/outbound/2900N12248/2017-12-28/15:21/timetable.json?app_id=91676f07&app_key=e10dc441385db6f855e3e5ad29bcd6c8",
            "operator_name": "First in Norfolk & Suff"
          },
          {
            "mode": "bus",
            "line": "13",
            "line_name": "13",
            "direction": "Attleborough,Queens",
            "operator": "FECS",
            "date": "2017-12-28",
            "expected_departure_date": null,
            "aimed_departure_time": "15:30",
            "expected_departure_time": null,
            "best_departure_estimate": "15:30",
            "source": "VIX",
            "dir": "inbound",
            "id": "https://transportapi.com/v3/uk/bus/route/FECS/13/inbound/2900N12248/2017-12-28/15:30/timetable.json?app_id=91676f07&app_key=e10dc441385db6f855e3e5ad29bcd6c8",
            "operator_name": "First in Norfolk & Suff"
          },
          {
            "mode": "bus",
            "line": "38",
            "line_name": "38",
            "direction": "Long Stratton, Mano",
            "operator": "FECS",
            "date": "2017-12-28",
            "expected_departure_date": "2017-12-28",
            "aimed_departure_time": "15:27",
            "expected_departure_time": "15:30",
            "best_departure_estimate": "15:30",
            "source": "VIX",
            "dir": "inbound",
            "id": "https://transportapi.com/v3/uk/bus/route/FECS/38/inbound/2900N12248/2017-12-28/15:27/timetable.json?app_id=91676f07&app_key=e10dc441385db6f855e3e5ad29bcd6c8",
            "operator_name": "First in Norfolk & Suff"
          },
          {
            "mode": "bus",
            "line": "36",
            "line_name": "36",
            "direction": "City Centre,St Step",
            "operator": "FECS",
            "date": "2017-12-28",
            "expected_departure_date": "2017-12-28",
            "aimed_departure_time": "15:37",
            "expected_departure_time": "15:34",
            "best_departure_estimate": "15:34",
            "source": "VIX",
            "dir": "inbound",
            "id": "https://transportapi.com/v3/uk/bus/route/FECS/36/inbound/2900N12248/2017-12-28/15:37/timetable.json?app_id=91676f07&app_key=e10dc441385db6f855e3e5ad29bcd6c8",
            "operator_name": "First in Norfolk & Suff"
          }
        ]
      },
      source: "VIX"
    })
    .do(this.logResponse)
    .catch(this.catchError);

    // return this.http.get(this.timetableUrl(atcocode))
    // .do(this.logResponse)
    // .map(res => res.json())
    // .catch(this.catchError)
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
