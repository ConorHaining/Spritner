import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Station } from '../models/Station';
import { LatLng } from '../models/LatLng';
import StationJSON from '../../assets/stations.json';

@Injectable({
  providedIn: 'root'
})
export class StationsService {

  stations: Station[] = [];

  constructor(private http: HttpClient) {
    StationJSON.forEach(element => {
      let station = new Station(
            element.name,
            element.crs,
            new LatLng(
              element.location.latitude,
              element.location.longitude
            )
          );
      this.stations.push(station);
    });
  }

  findByNameOrCrs(name: string): Station[]{
    let possibleStations: Station[] = [];
    possibleStations = this.stations.filter(station => {
      return station.crs.toLowerCase().includes(name.toLowerCase()) || station.name.toLowerCase().includes(name.toLowerCase());
    }).sort((a, b) => {
      if(a.crs === name && b.crs !== name) {
        return -1;
      }
      if(b.crs === name && a.crs !== name) {
        return 1;
      }
      return 0;
    });
    return possibleStations.slice(0, 8);
  }

  getByCrs(crs: string): Station{
    let possibleStations: Station[] = [];
    possibleStations = this.stations.filter(station => {
      return station.crs.toLowerCase().includes(crs.toLowerCase());
    });

    return possibleStations.pop();
  }
}
