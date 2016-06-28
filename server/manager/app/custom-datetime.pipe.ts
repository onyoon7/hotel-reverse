import { Pipe, PipeTransform } from 'angular2/core';
/*
 * Make Korean DateTime Format (yyyy-mm-dd hh:mm:ss)
 * Takes a string with format (yyyy-mm-ddThh:mm:ss.000Z).
 * Usage:
 *   value | makeKoreanDateTime
 * Example:
 *   {{ '2016-05-05-T12:33:44.000Z' |  makeKoreanDateTime }}
 *   formats to: 2016-05-05 12:33:44
*/

@Pipe({name: 'makeKoreanDateTime'})
export class MakeKoreanDateTimePipe implements PipeTransform {
  transform(value: string): string {
    let date = value.split('T')[0];
    let temp = value.split('T')[1];
    let time = temp.split('.')[0];

    return date + ' ' + time;
  }
}
