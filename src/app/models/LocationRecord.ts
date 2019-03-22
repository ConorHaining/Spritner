import { Station } from './Station';
import { DateTime } from 'luxon';

export class LocationRecord {
  constructor(
    station?: Station,
    platform?: string,
    publicArrival?: string,
    publicDeparture?: string,
    actualArrival?: string,
    actualDeprature?: string,
    predictedArrival?: string,
    predictedDeparture?: string,
  ) {
    this.station = station;
    this.platform = platform;
    this.publicDeparture = publicDeparture;
    this.publicArrival = publicArrival;
    this.actualDeparture = actualDeprature;
    this.actualArrival = actualArrival;
    this.predictedDeparture = predictedDeparture;
    this.predictedArrival = predictedArrival;
  }

  station: Station;
  platform: string;

  publicDeparture: string;
  publicArrival: string;

  actualDeparture: string;
  actualArrival: string;

  predictedDeparture: string;
  predictedArrival: string;

  get realtimeArrival(): string {
    if(this.actualArrival){
      return this.actualArrival;
    } else if (this.predictedArrival){
      return this.predictedArrival;
    } else {
      return this.publicArrival;
    }
  }

  get realtimeDeparture(): string {
    if(this.actualDeparture) {
      return this.actualDeparture;
    } else if (this.predictedDeparture){
      return this.predictedDeparture;
    } else {
      return this.publicDeparture;
    }
  }

  private findRealtimeDiff(): number {
    const timetable = DateTime.fromISO(this.publicTime);
    const realtime = DateTime.fromISO(this.actualTime);

    return timetable.diff(realtime).as('minutes');
  }
  get isEarly(): boolean{
    const diff = this.findRealtimeDiff();

    return diff > 0;
  }

  get isLate(): boolean{
    const diff = this.findRealtimeDiff();

    return diff < 0;
  }

  get status(): string{
    const diff = this.findRealtimeDiff();
    if(this.isEarly){
      return `${diff}m early`;
    } else if(this.isLate) {
      return `${Math.abs(diff)}m late`;
    } else if (diff === 0) {
      return 'On Time';
    }
  }

  get publicTime() {
    if(this.publicArrival) {
      return this.publicArrival;
    } else if (this.publicDeparture) {
      return this.publicDeparture;
    } else {
      return undefined;
    }
  }

  get actualTime() {
    if(this.actualArrival) {
      return this.actualArrival;
    } else if (this.actualDeparture) {
      return this.actualDeparture;
    } else {
      return undefined;
    }
  }

  get routerTime() {
    return this.publicTime.substring(0, 2) + this.publicTime.substring(3, 5);
  }

}