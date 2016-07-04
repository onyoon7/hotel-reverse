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
    var UpdateService;
    function mapHotel(response) {
        console.log("single hotel >>>>> ");
        console.log(response.json());
        return response.json();
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
            UpdateService = (function () {
                function UpdateService(_http) {
                    this._http = _http;
                    this.baseUrl = host_url_1.hostUrl + "hotel";
                }
                UpdateService.prototype.update = function (hotel, hotel_ID) {
                    var id = hotel_ID;
                    console.log("This is UPDATE data => ", hotel);
                    var hotel_Info = "hotel_PW=" + hotel.hotel_PW + "&hotel_Name=" + hotel.hotel_Name + "&hotel_Address=" + hotel.hotel_Address + "&mainArea_Name=" + hotel.mainArea_Name + "&subArea_Name=" + hotel.subArea_Name + "&hotel_Rate=" + hotel.hotel_Rate + "&mgr_Name=" + hotel.mgr_Name;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                    return this._http
                        .post(this.baseUrl + "/update/" + id, hotel_Info, { headers: headers })
                        .map(mapHotel);
                };
                UpdateService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], UpdateService);
                return UpdateService;
            }());
            exports_1("UpdateService", UpdateService);
        }
    }
});
//# sourceMappingURL=update.service.js.map