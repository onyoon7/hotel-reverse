System.register(['angular2/http', 'rxjs/add/operator/map', 'angular2/core'], function(exports_1, context_1) {
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
    var http_1, core_1;
    var GetService;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            GetService = (function () {
                function GetService(_http) {
                    this._http = _http;
                    this._url_get_hotels = "http://localhost:4444/admin/hotels";
                    this._url_get_hotel = "http://localhost:4444/admin/hotels/a1";
                    this._url_get_pendingbid = "http://localhost:4444/admin/pendingbid";
                    this._url_get_bidinfo = "http://localhost:4444/hotel/bid/";
                }
                GetService.prototype.getHotels = function () {
                    return this._http.get(this._url_get_hotels)
                        .map(function (res) { return res.json(); });
                };
                GetService.prototype.getHotel = function () {
                    return this._http.get(this._url_get_hotel)
                        .map(function (res) { return res.json(); });
                };
                GetService.prototype.getPendingBid = function () {
                    return this._http.get(this._url_get_pendingbid)
                        .map(function (res) { return res.json(); });
                };
                GetService.prototype.getBidInfo = function (id) {
                    console.log("IDDDD", id);
                    var val = this._http.get(this._url_get_bidinfo + id)
                        .map(function (res) { return res.json(); });
                    console.log('val: ', val);
                    return val;
                };
                GetService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], GetService);
                return GetService;
            }());
            exports_1("GetService", GetService);
        }
    }
});
//# sourceMappingURL=get.service.js.map