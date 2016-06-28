System.register(['angular2/core', 'angular2/router', '../services/deals.service', '../custom-date.pipe', '../custom-datetime.pipe'], function(exports_1, context_1) {
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
    var core_1, router_1, deals_service_1, custom_date_pipe_1, custom_datetime_pipe_1;
    var DealDetailsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (deals_service_1_1) {
                deals_service_1 = deals_service_1_1;
            },
            function (custom_date_pipe_1_1) {
                custom_date_pipe_1 = custom_date_pipe_1_1;
            },
            function (custom_datetime_pipe_1_1) {
                custom_datetime_pipe_1 = custom_datetime_pipe_1_1;
            }],
        execute: function() {
            DealDetailsComponent = (function () {
                function DealDetailsComponent(dealsService, routeParams, router) {
                    this.dealsService = dealsService;
                    this.routeParams = routeParams;
                    this.router = router;
                }
                DealDetailsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var hotel_ID = this.routeParams.get('hotel_ID');
                    var booking_Num = Number.parseInt(this.routeParams.get('booking_Num'));
                    console.log('getting deal with booking_Num: ', booking_Num);
                    this.dealsService
                        .getDeal(hotel_ID, booking_Num)
                        .subscribe(function (d) { return _this.deal = d; }, function (error) { return console.error('Error: ' + error); }, function () { return console.log('Successfully fetched a Deal!'); });
                };
                DealDetailsComponent.prototype.gotoDealsList = function () {
                    var link = ['Deals'];
                    this.router.navigate(link);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], DealDetailsComponent.prototype, "deal", void 0);
                DealDetailsComponent = __decorate([
                    core_1.Component({
                        selector: 'deal-details',
                        template: "\n\n    <div class=\"container\" *ngIf=\"deal\">\n      <table class=\"table table-hover table-bordered table-striped\">\n        <thead>\n          <tr>\n            <th>\uC608\uC57D\uBC88\uD638</th>\n            <th>\uACE0\uAC1D\uBC88\uD638</th>\n            <th>\uCCB4\uD06C\uC778</th>\n            <th>\uCCB4\uD06C\uC544\uC6C3</th>\n            <th>\uC9C0\uC5ED</th>\n            <th>\uC785\uCC30\uAC00\uACA9</th>\n            <th>\uC785\uCC30 \uC2DC\uC791\uC2DC\uAC04</th>\n            <th>\uC785\uCC30 \uC885\uB8CC\uC2DC\uAC04</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>{{deal.booking_Num}}</td>\n            <td>{{deal.client_Index}}</td>\n            <td>{{deal.checkIn_Date | makeKoreanDate }}</td>\n            <td>{{deal.checkOut_Date | makeKoreanDate }}</td>\n            <td>{{deal.mainArea_Name + ' ' + deal.subArea_Name }}</td>\n            <td>{{deal.bid_Price | number }}</td>\n            <td>{{deal.bid_StartTime | makeKoreanDateTime }}</td>\n            <td>{{deal.bid_EndTime | makeKoreanDateTime }}</td>\n          </tr>\n        </tbody>\n      </table>\n\n      <button class=\"btn btn-success\" (click)=\"gotoDealsList()\">\uAC70\uB798 \uB0B4\uC5ED\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30</button>\n    </div>\n\n  ",
                        pipes: [custom_date_pipe_1.MakeKoreanDatePipe, custom_datetime_pipe_1.MakeKoreanDateTimePipe]
                    }), 
                    __metadata('design:paramtypes', [deals_service_1.DealsService, router_1.RouteParams, router_1.Router])
                ], DealDetailsComponent);
                return DealDetailsComponent;
            }());
            exports_1("DealDetailsComponent", DealDetailsComponent);
        }
    }
});
//# sourceMappingURL=deal-details.component.js.map