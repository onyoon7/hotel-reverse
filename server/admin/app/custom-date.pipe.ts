import { Pipe, PipeTransform } from 'angular2/core';
/*
 * Make Korean Date Format (yyyy-mm-dd)
 * Takes a string with format (yyyy-mm-ddThh:mm:ss.000Z).
 * Usage:
 *   value | makeKoreanDate
 * Example:
 *   {{ '2016-05-05-T12:33:44.000Z' |  makeKoreanDate }}
 *   formats to: 2016-05-05
*/
@Pipe({name: 'makeKoreanDate'})
export class MakeKoreanDatePipe implements PipeTransform {
  transform(value: string): string {
    let date = value.split('T')[0];
    return date;
  }
}