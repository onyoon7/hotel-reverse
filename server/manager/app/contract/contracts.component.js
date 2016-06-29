System.register(['angular2/core', 'angular2/router', './contract-details.component', '../services/contracts.service', '../services/authentication.service'], function(exports_1, context_1) {
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
    var core_1, router_1, router_2, contract_details_component_1, contracts_service_1, authentication_service_1;
    var ContractsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (contract_details_component_1_1) {
                contract_details_component_1 = contract_details_component_1_1;
            },
            function (contracts_service_1_1) {
                contracts_service_1 = contracts_service_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }],
        execute: function() {
            ContractsComponent = (function () {
                function ContractsComponent(contractsService, routeParams, router, _service) {
                    this.contractsService = contractsService;
                    this.routeParams = routeParams;
                    this.router = router;
                    this._service = _service;
                    this.contracts = [];
                    this.flag = false;
                    this.flag = _service.checkCredentials();
                }
                ContractsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (this.flag) {
                        var hotel = localStorage.getItem("hotel");
                        console.log('hotel getItem: ', hotel);
                        var temp = JSON.parse(hotel);
                        this.hotel_ID = temp.hotel_ID;
                        console.log('hotel_ID: ', this.hotel_ID);
                        this.contractsService
                            .getAllContracts(this.hotel_ID)
                            .subscribe(function (c) { return _this.contracts = c; }, function (error) { return console.error('Error: ' + error); }, function () { return console.log('Successfully fetched Contracts data!'); });
                    }
                };
                ContractsComponent.prototype.selectContract = function (contract) {
                    this.selectedContract = contract;
                };
                ContractsComponent.prototype.logout = function () {
                    this._service.logout();
                };
                ContractsComponent = __decorate([
                    core_1.Component({
                        selector: 'contracts-list',
                        directives: [contract_details_component_1.ContractDetailsComponent, router_1.ROUTER_DIRECTIVES],
                        providers: [authentication_service_1.AuthenticationService, contracts_service_1.ContractsService],
                        template: "\n\n    <ul>\n      <li *ngFor=\"#contract of contracts\">\n        <a href=\"#\" [routerLink]=\"['Contract Details', {hotel_ID: hotel_ID, booking_Num: contract.booking_Num}]\">{{contract.subArea_Name}}</a>\n      </li>\n    </ul>\n    <a (click)=\"logout()\" href=\"#\">logout</a>\n  "
                    }), 
                    __metadata('design:paramtypes', [contracts_service_1.ContractsService, router_2.RouteParams, router_2.Router, authentication_service_1.AuthenticationService])
                ], ContractsComponent);
                return ContractsComponent;
            }());
            exports_1("ContractsComponent", ContractsComponent);
        }
    }
});
//# sourceMappingURL=contracts.component.js.map