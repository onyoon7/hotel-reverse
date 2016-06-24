System.register(['angular2/core', 'angular2/router', '../services/hotels.service'], function(exports_1, context_1) {
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
    var core_1, router_1, hotels_service_1;
    var HotelDetailsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (hotels_service_1_1) {
                hotels_service_1 = hotels_service_1_1;
            }],
        execute: function() {
            HotelDetailsComponent = (function () {
                function HotelDetailsComponent(hotelsService, routeParams, router) {
                    this.hotelsService = hotelsService;
                    this.routeParams = routeParams;
                    this.router = router;
                }
                HotelDetailsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var hotel_ID = this.routeParams.get('hotel_ID');
                    console.log('getting hotel with hotel_ID: ', hotel_ID);
                    this.hotelsService
                        .getHotel(hotel_ID)
                        .subscribe(function (h) { return _this.hotel = h; }, function (error) { return console.error('Error: ' + error); }, function () { return console.log('Successfully fetched a Hotel data!'); });
                };
                HotelDetailsComponent.prototype.gotoHotelsList = function () {
                    var link = ['Hotels'];
                    this.router.navigate(link);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], HotelDetailsComponent.prototype, "hotel", void 0);
                HotelDetailsComponent = __decorate([
                    core_1.Component({
                        selector: 'hotel-details',
                        template: "\n\n    <div class=\"container\" *ngIf=\"hotel\">\n      <table class=\"table table-hover table-bordered table-striped\">\n        <thead>\n          <tr>\n            <th>\uD638\uD154 \uBC88\uD638</th>\n            <th>\uC544\uC774\uB514</th>\n            <th>\uBE44\uBC00\uBC88\uD638</th>\n            <th>\uD638\uD154 \uC774\uB984</th>\n            <th>\uC8FC\uC18C</th>\n            <th>\uC9C0\uC5ED(\uB300\uBD84\uB958)</th>\n            <th>\uC9C0\uC5ED(\uC18C\uBD84\uB958)</th>\n            <th>\uB4F1\uAE09</th>\n            <th>\uB2F4\uB2F9\uC790</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>{{hotel.hotel_Index}}</td>\n            <td>{{hotel.hotel_ID}}</td>\n            <td>{{hotel.hotel_PW}}</td>\n            <td>{{hotel.hotel_Name}}</td>\n            <td>{{hotel.hotel_Address}}</td>\n            <td>{{hotel.mainArea_Name}}</td>\n            <td>{{hotel.subArea_Name}}</td>\n            <td>{{hotel.hotel_Rate}}</td>\n            <td>{{hotel.mgr_Name}}</td>\n          </tr>\n        </tbody>\n      </table>\n\n      <button class=\"btn btn-success\" (click)=\"gotoHotelsList()\">\uC804\uCCB4 \uD638\uD154 \uB9AC\uC2A4\uD2B8</button>\n    </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [hotels_service_1.HotelsService, router_1.RouteParams, router_1.Router])
                ], HotelDetailsComponent);
                return HotelDetailsComponent;
            }());
            exports_1("HotelDetailsComponent", HotelDetailsComponent);
        }
    }
});
//# sourceMappingURL=hotel-details.component.js.map