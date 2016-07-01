System.register(['angular2/core', 'angular2/router', './deal-details.component', '../services/deals.service', '../services/authentication.service', '../services/sign.service', '../custom-datetime.pipe'], function(exports_1, context_1) {
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
    var core_1, router_1, router_2, deal_details_component_1, deals_service_1, authentication_service_1, sign_service_1, custom_datetime_pipe_1;
    var DealsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (deal_details_component_1_1) {
                deal_details_component_1 = deal_details_component_1_1;
            },
            function (deals_service_1_1) {
                deals_service_1 = deals_service_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (sign_service_1_1) {
                sign_service_1 = sign_service_1_1;
            },
            function (custom_datetime_pipe_1_1) {
                custom_datetime_pipe_1 = custom_datetime_pipe_1_1;
            }],
        execute: function() {
            DealsComponent = (function () {
                function DealsComponent(dealsService, routeParams, router, _service) {
                    this.dealsService = dealsService;
                    this.routeParams = routeParams;
                    this.router = router;
                    this._service = _service;
                    this.deals = [];
                    this.flag = false;
                    this.flag = _service.checkCredentials();
                }
                DealsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (this.flag) {
                        var hotel = localStorage.getItem("hotel");
                        console.log('hotel getItem: ', hotel);
                        var temp = JSON.parse(hotel);
                        this.hotel_ID = temp.hotel_ID;
                        this.dealsService
                            .getAllDeals(this.hotel_ID)
                            .subscribe(function (d) {
                            d.sort(function (a, b) {
                                var endTime_1 = new Date("" + a.bid_EndTime);
                                var endTime_2 = new Date("" + b.bid_EndTime);
                                var endTime = endTime_1 - endTime_2;
                                return endTime;
                            });
                            _this.deals = d;
                        }, function (error) { return console.error('Error: ' + error); }, function () { return console.log('Successfully fetched all Deals!', _this.deals); });
                    }
                };
                DealsComponent.prototype.onSelect = function (deal) {
                    this.router.navigate(['Deal Details', { hotel_ID: this.hotel_ID, booking_Num: deal.booking_Num }]);
                };
                DealsComponent = __decorate([
                    core_1.Component({
                        selector: 'deals-list',
                        directives: [deal_details_component_1.DealDetailsComponent, router_1.ROUTER_DIRECTIVES],
                        providers: [authentication_service_1.AuthenticationService, deals_service_1.DealsService, sign_service_1.SignService],
                        templateUrl: './app/template/deals.html',
                        styleUrls: ['./app/style/deals.css'],
                        pipes: [custom_datetime_pipe_1.MakeKoreanDateTimePipe]
                    }), 
                    __metadata('design:paramtypes', [deals_service_1.DealsService, router_2.RouteParams, router_2.Router, authentication_service_1.AuthenticationService])
                ], DealsComponent);
                return DealsComponent;
            }());
            exports_1("DealsComponent", DealsComponent);
        }
    }
});
//# sourceMappingURL=deals.component.js.map