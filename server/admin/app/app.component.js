System.register(['angular2/core', 'angular2/router', './deal/deals.component', './deal/deal-details.component', './services/deals.service', './contract/contracts.component', './contract/contract-details.component', './services/contracts.service', './hotel/hotels.component', './hotel/hotel-details.component', './services/hotels.service', './client/clients.component', './client/client-details.component', './services/clients.service'], function(exports_1, context_1) {
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
    var core_1, router_1, deals_component_1, deal_details_component_1, deals_service_1, contracts_component_1, contract_details_component_1, contracts_service_1, hotels_component_1, hotel_details_component_1, hotels_service_1, clients_component_1, client_details_component_1, clients_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (deals_component_1_1) {
                deals_component_1 = deals_component_1_1;
            },
            function (deal_details_component_1_1) {
                deal_details_component_1 = deal_details_component_1_1;
            },
            function (deals_service_1_1) {
                deals_service_1 = deals_service_1_1;
            },
            function (contracts_component_1_1) {
                contracts_component_1 = contracts_component_1_1;
            },
            function (contract_details_component_1_1) {
                contract_details_component_1 = contract_details_component_1_1;
            },
            function (contracts_service_1_1) {
                contracts_service_1 = contracts_service_1_1;
            },
            function (hotels_component_1_1) {
                hotels_component_1 = hotels_component_1_1;
            },
            function (hotel_details_component_1_1) {
                hotel_details_component_1 = hotel_details_component_1_1;
            },
            function (hotels_service_1_1) {
                hotels_service_1 = hotels_service_1_1;
            },
            function (clients_component_1_1) {
                clients_component_1 = clients_component_1_1;
            },
            function (client_details_component_1_1) {
                client_details_component_1 = client_details_component_1_1;
            },
            function (clients_service_1_1) {
                clients_service_1 = clients_service_1_1;
            }],
        execute: function() {
            // @Component: 컴포넌트 데코레이터, AppComponent를 컴포넌트 타입의 클래스로 만들어줌
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: '/app/app.component.html',
                        directives: [deals_component_1.DealsComponent, hotels_component_1.HotelsComponent, clients_component_1.ClientsComponent, router_1.ROUTER_DIRECTIVES],
                        providers: [deals_service_1.DealsService, hotels_service_1.HotelsService, contracts_service_1.ContractsService, clients_service_1.ClientsService]
                    }),
                    router_1.RouteConfig([
                        { path: '/deals', name: 'Deals', component: deals_component_1.DealsComponent, useAsDefault: true },
                        { path: '/deal/:booking_Num', name: 'Deal Details', component: deal_details_component_1.DealDetailsComponent },
                        { path: '/contracts', name: 'Contracts', component: contracts_component_1.ContractsComponent },
                        { path: '/contracts/:booking_Num', name: 'Contract Details', component: contract_details_component_1.ContractDetailsComponent },
                        { path: '/hotels', name: 'Hotels', component: hotels_component_1.HotelsComponent },
                        { path: '/hotels/:hotel_ID', name: 'Hotel Details', component: hotel_details_component_1.HotelDetailsComponent },
                        { path: '/clients', name: 'Clients', component: clients_component_1.ClientsComponent },
                        { path: '/clients/:client_Email', name: 'Client Details', component: client_details_component_1.ClientDetailsComponent },
                        { path: '/*other', name: 'Other', redirectTo: ['Deals'] }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map