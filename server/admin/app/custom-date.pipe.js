System.register(['angular2/core'], function(exports_1, context_1) {
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
    var MakeKoreanDatePipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /*
             * Make Korean Date Format (yyyy-mm-dd)
             * Takes a string with format (yyyy-mm-ddThh:mm:ss.000Z).
             * Usage:
             *   value | makeKoreanDate
             * Example:
             *   {{ '2016-05-05-T12:33:44.000Z' |  makeKoreanDate }}
             *   formats to: 2016-05-05
            */
            MakeKoreanDatePipe = (function () {
                function MakeKoreanDatePipe() {
                }
                MakeKoreanDatePipe.prototype.transform = function (value) {
                    var date = value.split('T')[0];
                    return date;
                };
                MakeKoreanDatePipe = __decorate([
                    core_1.Pipe({ name: 'makeKoreanDate' }), 
                    __metadata('design:paramtypes', [])
                ], MakeKoreanDatePipe);
                return MakeKoreanDatePipe;
            }());
            exports_1("MakeKoreanDatePipe", MakeKoreanDatePipe);
        }
    }
});
//# sourceMappingURL=custom-date.pipe.js.map