System.register(['angular2/core', 'angular2/router', './sign/login.component', './sign/signup.component', './services/sign.service', './deal/deals.component', './deal/deal-details.component', './services/deals.service', './contract/contracts.component', './contract/contract-details.component', './services/contracts.service', './update/update.component', './services/update.service'], function(exports_1, context_1) {
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
    var core_1, router_1, login_component_1, signup_component_1, sign_service_1, deals_component_1, deal_details_component_1, deals_service_1, contracts_component_1, contract_details_component_1, contracts_service_1, update_component_1, update_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (signup_component_1_1) {
                signup_component_1 = signup_component_1_1;
            },
            function (sign_service_1_1) {
                sign_service_1 = sign_service_1_1;
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
            function (update_component_1_1) {
                update_component_1 = update_component_1_1;
            },
            function (update_service_1_1) {
                update_service_1 = update_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        directives: [login_component_1.LoginComponent, signup_component_1.SignupComponent, deals_component_1.DealsComponent, update_component_1.UpdateComponent, router_1.ROUTER_DIRECTIVES],
                        providers: [sign_service_1.SignService, deals_service_1.DealsService, contracts_service_1.ContractsService, update_service_1.UpdateService],
                        templateUrl: '/app/app.component.html'
                    }),
                    router_1.RouteConfig([
                        { path: '/login', name: 'Login', component: login_component_1.LoginComponent },
                        { path: '/signup', name: 'Signup', component: signup_component_1.SignupComponent },
                        { path: '/deals', name: 'Deals', component: deals_component_1.DealsComponent, useAsDefault: true },
                        { path: '/deals/:hotel_ID/:booking_Num', name: 'Deal Details', component: deal_details_component_1.DealDetailsComponent },
                        { path: '/contracts', name: 'Contracts', component: contracts_component_1.ContractsComponent },
                        { path: '/contracts/:hotel_ID/:booking_Num', name: 'Contract Details', component: contract_details_component_1.ContractDetailsComponent },
                        { path: '/update', name: 'Update', component: update_component_1.UpdateComponent }
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