System.register(['angular2/core', 'angular2/router', '../services/contracts.service', '../custom-date.pipe', '../custom-datetime.pipe'], function(exports_1, context_1) {
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
    var core_1, router_1, contracts_service_1, custom_date_pipe_1, custom_datetime_pipe_1;
    var ContractDetailsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (contracts_service_1_1) {
                contracts_service_1 = contracts_service_1_1;
            },
            function (custom_date_pipe_1_1) {
                custom_date_pipe_1 = custom_date_pipe_1_1;
            },
            function (custom_datetime_pipe_1_1) {
                custom_datetime_pipe_1 = custom_datetime_pipe_1_1;
            }],
        execute: function() {
            ContractDetailsComponent = (function () {
                function ContractDetailsComponent(contractsService, routeParams, router) {
                    this.contractsService = contractsService;
                    this.routeParams = routeParams;
                    this.router = router;
                }
                ContractDetailsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var booking_Num = Number.parseInt(this.routeParams.get('booking_Num'));
                    console.log('getting contract with booking_Num: ', booking_Num);
                    this.contractsService
                        .getContract(booking_Num)
                        .subscribe(function (c) { return _this.contract = c; }, function (error) { return console.error('Error: ' + error); }, function () { return console.log('Successfully fetched a Contract data!'); });
                };
                ContractDetailsComponent.prototype.gotoContractsList = function () {
                    var link = ['Contracts'];
                    this.router.navigate(link);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], ContractDetailsComponent.prototype, "contract", void 0);
                ContractDetailsComponent = __decorate([
                    core_1.Component({
                        selector: 'contract-details',
                        template: "\n\n    <div class=\"container\" *ngIf=\"contract\">\n      <table class=\"table table-hover table-bordered table-striped\">\n        <thead>\n          <tr>\n            <th>\uC608\uC57D\uBC88\uD638</th>\n            <th>\uACE0\uAC1D\uBC88\uD638</th>\n            <th>\uCCB4\uD06C\uC778</th>\n            <th>\uCCB4\uD06C\uC544\uC6C3</th>\n            <th>\uC9C0\uC5ED</th>\n            <th>\uC785\uCC30\uAC00\uACA9</th>\n            <th>\uC785\uCC30 \uC2DC\uC791\uC2DC\uAC04</th>\n            <th>\uC785\uCC30 \uC885\uB8CC\uC2DC\uAC04</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>{{contract.booking_Num}}</td>\n            <td>{{contract.client_Index}}</td>\n            <td>{{contract.checkIn_Date | makeKoreanDate }}</td>\n            <td>{{contract.checkOut_Date | makeKoreanDate }}</td>\n            <td>{{contract.mainArea_Name + ' ' + contract.subArea_Name}}</td>\n            <td>{{contract.bid_Price | number }}</td>\n            <td>{{contract.bid_StartTime | makeKoreanDateTime }}</td>\n            <td>{{contract.bid_EndTime | makeKoreanDateTime }}</td>\n          </tr>\n        </tbody>\n      </table>\n\n      <button class=\"btn btn-success\" (click)=\"gotoContractsList()\">\uCCB4\uACB0 \uB0B4\uC5ED\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30</button>\n    </div>\n\n  ",
                        pipes: [custom_date_pipe_1.MakeKoreanDatePipe, custom_datetime_pipe_1.MakeKoreanDateTimePipe]
                    }), 
                    __metadata('design:paramtypes', [contracts_service_1.ContractsService, router_1.RouteParams, router_1.Router])
                ], ContractDetailsComponent);
                return ContractDetailsComponent;
            }());
            exports_1("ContractDetailsComponent", ContractDetailsComponent);
        }
    }
});
//# sourceMappingURL=contract-details.component.js.map