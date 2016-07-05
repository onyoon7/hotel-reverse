System.register(['angular2/core', 'angular2/http', 'rxjs/Rx', './host-url'], function(exports_1, context_1) {
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
    var core_1, http_1, host_url_1;
    var HotelsService;
    function mapHotels(response) {
        console.log("response is >>>>>> ");
        console.log(response.json());
        return response.json().map(toHotel);
    }
    function mapHotel(response) {
        console.log("single hotel >>>>> ");
        console.log(response.json());
        return response.json();
    }
    function toHotel(r) {
        var hotel = ({
            hotel_Index: r.hotel_Index,
            hotel_ID: r.hotel_ID,
            hotel_PW: r.hotel_PW,
            hotel_Name: r.hotel_Name,
            mainArea_Name: r.mainArea_Name,
            subArea_Name: r.subArea_Name,
            hotel_Rate: r.hotel_Rate,
            mgr_Name: r.mgr_Name
        });
        return hotel;
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (host_url_1_1) {
                host_url_1 = host_url_1_1;
            }],
        execute: function() {
            HotelsService = (function () {
                function HotelsService(_http) {
                    this._http = _http;
                    this.baseUrl = host_url_1.hostUrl + 'admin';
                }
                HotelsService.prototype.getAllHotels = function () {
                    var hotels = this._http
                        .get(this.baseUrl + "/hotels")
                        .map(mapHotels);
                    return hotels;
                };
                HotelsService.prototype.getHotel = function (hotel_ID) {
                    var hotel = this._http
                        .get(this.baseUrl + "/hotels/" + hotel_ID)
                        .map(mapHotel);
                    return hotel;
                };
                HotelsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], HotelsService);
                return HotelsService;
            }());
            exports_1("HotelsService", HotelsService);
        }
    }
});
//# sourceMappingURL=hotels.service.js.map