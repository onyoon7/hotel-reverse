System.register(['angular2/core', 'angular2/http', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, http_1;
    var SignService;
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
            function (_1) {}],
        execute: function() {
            SignService = (function () {
                function SignService(_http) {
                    this._http = _http;
                    this.baseUrl = "http://localhost:4444/hotel";
                }
                SignService.prototype.logIn = function (data) {
                    var hotel_ID = data.hotel_ID;
                    var hotel_PW = data.hotel_PW;
                    var hotel_Info = "hotel_ID=" + hotel_ID + "&hotel_PW=" + hotel_PW;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                    var hotel = this._http
                        .post(this.baseUrl + "/signin", hotel_Info, { headers: headers })
                        .map(mapHotel);
                    return hotel;
                };
                SignService.prototype.signUp = function (hotel) {
                    console.log("THIS IS SGNUP DATA => ", hotel);
                    var hotel_Info = "hotel_ID=" + hotel.hotel_ID + "&hotel_PW=" + hotel.hotel_PW + "&hotel_Name=" + hotel.hotel_Name + "&hotel_Address=" + hotel.hotel_Address + "&mainArea_Name=" + hotel.mainArea_Name + "&subArea_Name=" + hotel.subArea_Name + "&hotel_Rate=" + hotel.hotel_Rate + "&mgr_Name=" + hotel.mgr_Name;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                    return this._http.post(this.baseUrl + "/signup", hotel_Info, { headers: headers })
                        .map(mapHotel);
                };
                SignService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], SignService);
                return SignService;
            }());
            exports_1("SignService", SignService);
        }
    }
});
//# sourceMappingURL=sign.service.js.map