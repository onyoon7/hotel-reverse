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
    var PostService;
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
            PostService = (function () {
                function PostService(_http) {
                    this._http = _http;
                    this._url_hotel_signin = "http://localhost:4444/hotel/signin";
                    this._url_hotel_signup = "http://localhost:4444/hotel/signup";
                }
                PostService.prototype.hotelSignIn = function (hotel) {
                    var hotel_ID = hotel.hotel_ID;
                    var hotel_PW = hotel.hotel_PW;
                    var hotel_Info = "hotel_ID=" + hotel_ID + "&hotel_PW=" + hotel_PW;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                    return this._http.post(this._url_hotel_signin, hotel_Info, { headers: headers })
                        .map(function (res) { return res.json(); });
                };
                PostService.prototype.hotelSignUp = function (hotel) {
                    console.log(hotel);
                    var hotel_Info = "hotel_ID=" + hotel.hotel_ID + "&hotel_PW=" + hotel.hotel_PW + "&hotel_Name=" + hotel.hotel_Name + "&hotel_Address=" + hotel.hotel_Address + "&mainArea_Name=" + hotel.mainArea_Name + "&subArea_Name=" + hotel.subArea_Name + "&hotel_Rate=" + hotel.hotel_Rate + "&mgr_Name=" + hotel.mgr_Name;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                    return this._http.post(this._url_hotel_signup, hotel_Info, { headers: headers })
                        .map(function (res) { return res.json(); });
                };
                PostService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], PostService);
                return PostService;
            }());
            exports_1("PostService", PostService);
        }
    }
});
//# sourceMappingURL=post.service.js.map