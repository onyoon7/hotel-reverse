System.register(['angular2/core', 'angular2/router', './hotel-details.component', '../services/hotels.service'], function(exports_1, context_1) {
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
    var core_1, router_1, hotel_details_component_1, hotels_service_1;
    var HotelsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (hotel_details_component_1_1) {
                hotel_details_component_1 = hotel_details_component_1_1;
            },
            function (hotels_service_1_1) {
                hotels_service_1 = hotels_service_1_1;
            }],
        execute: function() {
            HotelsComponent = (function () {
                function HotelsComponent(hotelsService) {
                    this.hotelsService = hotelsService;
                    this.hotels = [];
                }
                HotelsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.hotelsService
                        .getAllHotels()
                        .subscribe(function (h) { return _this.hotels = h; }, function (error) { return console.error('Error: ' + error); }, function () { return console.log('Successfully fetched Hotels data!'); });
                };
                HotelsComponent.prototype.selectHotel = function (hotel) {
                    this.selectedHotel = hotel;
                };
                HotelsComponent = __decorate([
                    core_1.Component({
                        selector: 'hotels-list',
                        directives: [hotel_details_component_1.HotelDetailsComponent, router_1.ROUTER_DIRECTIVES],
                        template: "\n\n    <ul>\n      <li *ngFor=\"#hotel of hotels\">\n        <a href=\"#\" [routerLink]=\"['Hotel Details', {hotel_ID: hotel.hotel_ID}]\">{{hotel.hotel_Name}}</a>\n      </li>\n    </ul>\n\n  "
                    }), 
                    __metadata('design:paramtypes', [hotels_service_1.HotelsService])
                ], HotelsComponent);
                return HotelsComponent;
            }());
            exports_1("HotelsComponent", HotelsComponent);
        }
    }
});
//# sourceMappingURL=hotels.component.js.map