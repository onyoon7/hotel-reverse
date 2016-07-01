System.register(["angular2/core"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var OrderByPipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            OrderByPipe = (function () {
                function OrderByPipe() {
                }
                OrderByPipe.prototype.transform = function (array, args) {
                    console.log("Array!!!!!!!!!!!!!!!!!!!!", array);
                    array.sort(function (a, b) {
                        return a.bid_price - b.bid_price;
                    });
                    return array;
                };
                OrderByPipe = __decorate([
                    core_1.Pipe({
                        name: "orderby"
                    }), 
                    __metadata('design:paramtypes', [])
                ], OrderByPipe);
                return OrderByPipe;
            }());
            exports_1("OrderByPipe", OrderByPipe);
        }
    }
});
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
//# sourceMappingURL=orderby.pipe.js.map