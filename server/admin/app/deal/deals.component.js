System.register(['angular2/core', 'angular2/router', './deal-details.component', '../services/deals.service'], function(exports_1, context_1) {
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
    var core_1, router_1, deal_details_component_1, deals_service_1;
    var DealsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (deal_details_component_1_1) {
                deal_details_component_1 = deal_details_component_1_1;
            },
            function (deals_service_1_1) {
                deals_service_1 = deals_service_1_1;
            }],
        execute: function() {
            DealsComponent = (function () {
                function DealsComponent(dealsService) {
                    this.dealsService = dealsService;
                    this.deals = [];
                }
                DealsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.dealsService
                        .getAllDeals()
                        .subscribe(function (d) { return _this.deals = d; }, function (error) { return console.error('Error: ' + error); }, function () { return console.log('Successfully fetched all Deals!'); });
                };
                DealsComponent.prototype.selectDeal = function (deal) {
                    this.selectedDeal = deal;
                };
                DealsComponent = __decorate([
                    core_1.Component({
                        selector: 'deals-list',
                        template: "\n\n    <ul>\n      <li *ngFor=\"#deal of deals\">\n        <a href=\"#\" [routerLink]=\"['Deal Details', {booking_Num: deal.booking_Num}]\">{{deal.subArea_Name}}</a>\n      </li>\n    </ul>\n\n  ",
                        directives: [deal_details_component_1.DealDetailsComponent, router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [deals_service_1.DealsService])
                ], DealsComponent);
                return DealsComponent;
            }());
            exports_1("DealsComponent", DealsComponent);
        }
    }
});
//# sourceMappingURL=deals.component.js.map