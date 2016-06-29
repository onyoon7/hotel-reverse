import { Pipe } from "angular2/core";

@Pipe({
  name: "orderby"
})
export class OrderByPipe {
  transform(array: Array<string>, args: string): Array<string> {
    console.log("Array!!!!!!!!!!!!!!!!!!!!", array);
    array.sort((a: any, b: any) => {
      return a.bid_price - b.bid_price;
    });
    return array;
  }
}

// import { Pipe, PipeTransform } from 'angular2/core';
//
// @Pipe({name: 'sort'})
// export class SortPipe implements PipeTransform {
//   transform(items: any[], args: any[]): any {
//     let price = [];
//     for(var i = 0; i < items.length; i++){
//       price.push(items[i].bid_Price);
//     }
//     return price.sort((a, b) => {
//       return a - b;
//     })
//   }
// }
