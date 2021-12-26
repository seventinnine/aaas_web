import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'intervalToReadableTime'
})
export class IntervalToReadableTimePipe implements PipeTransform {

  // modified version of https://stackoverflow.com/questions/19700283/how-to-convert-time-in-milliseconds-to-hours-min-sec-format-in-javascript
  humanReadableDuration(msDuration?: number): string {
    if (!msDuration) return "loading...";
    const h = Math.floor(msDuration / 1000 / 60 / 60);
    const m = Math.floor((msDuration / 1000 / 60 / 60 - h) * 60);
    const s = Math.floor(((msDuration / 1000 / 60 / 60 - h) * 60 - m) * 60);

    // To get time format 00:00:00
    const seconds: string = s < 10 ? `0${s}` : `${s}`;
    const minutes: string = m < 10 ? `0${m}` : `${m}`;
    const hours: string = h < 10 ? `0${h}` : `${h}`;

    return `${hours}h ${minutes}m ${seconds}s`;
}

  transform(value?: number): string {
    return this.humanReadableDuration(value);
  }

}
