System.register(['angular2/core', 'angular2/router', './sign.service'], function(exports_1, context_1) {
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
    var core_1, router_1, sign_service_1;
    var AuthenticationService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (sign_service_1_1) {
                sign_service_1 = sign_service_1_1;
            }],
        execute: function() {
            AuthenticationService = (function () {
                function AuthenticationService(_router, signService) {
                    this._router = _router;
                    this.signService = signService;
                }
                AuthenticationService.prototype.logout = function () {
                    localStorage.removeItem("hotel");
                    this._router.navigate(['Login']);
                };
                AuthenticationService.prototype.login = function (hotel) {
                    var _this = this;
                    var h = hotel;
                    var authenticatedHotel;
                    this.signService
                        .logIn(hotel)
                        .subscribe(function (d) {
                        console.log("dddddd => ", d);
                        authenticatedHotel = (d.hotel_ID === h.hotel_ID && d.hotel_PW === h.hotel_PW);
                        console.log("authenticated hotel is: ", authenticatedHotel);
                        if (authenticatedHotel) {
                            localStorage.setItem("hotel", JSON.stringify(h));
                            _this._router.navigate(['Deals']);
                            return true;
                        }
                        return false;
                    }, function (error) { return console.log(error); }, function () { return console.log('Success!!!'); });
                };
                AuthenticationService.prototype.checkCredentials = function () {
                    if (localStorage.getItem("hotel") === null) {
                        this._router.navigate(['Login']);
                        return false;
                    }
                    return true;
                };
                AuthenticationService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [router_1.Router, sign_service_1.SignService])
                ], AuthenticationService);
                return AuthenticationService;
            }());
            exports_1("AuthenticationService", AuthenticationService);
        }
    }
});
//# sourceMappingURL=authentication.service.js.map