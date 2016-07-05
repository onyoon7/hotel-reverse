System.register(['angular2/core', 'angular2/http', 'rxjs/Rx', './host-url'], function(exports_1, context_1) {
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
    var core_1, http_1, host_url_1;
    var ContractsService;
    function mapContracts(response) {
        console.log("response is >>>>>> ");
        console.log(response.json());
        return response.json().map(toContract);
    }
    function mapContract(response) {
        console.log("single deal >>>>> ");
        console.log(response.json());
        return response.json();
    }
    function toContract(r) {
        var contract = ({
            booking_Num: r.booking_Num,
            client_Index: r.client_Index,
            hotel_ID: r.hotel_ID,
            checkIn_Date: r.checkIn_Date,
            checkOut_Date: r.checkOut_Date,
            mainArea_Name: r.mainArea_Name,
            subArea_Name: r.subArea_Name,
            bid_Price: r.bid_Price,
            bid_StartTime: r.bid_StartTime,
            bid_EndTime: r.bid_EndTime,
            bid_Transaction: r.bid_Transaction
        });
        return contract;
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (host_url_1_1) {
                host_url_1 = host_url_1_1;
            }],
        execute: function() {
            ContractsService = (function () {
                function ContractsService(_http) {
                    this._http = _http;
                    this.baseUrl = host_url_1.hostUrl + 'admin';
                }
                ContractsService.prototype.getAllContracts = function () {
                    var contracts = this._http
                        .get(this.baseUrl + "/bidinfo")
                        .map(mapContracts);
                    return contracts;
                };
                ContractsService.prototype.getContract = function (booking_Num) {
                    var contract = this._http
                        .get(this.baseUrl + "/bidinfo/" + booking_Num)
                        .map(mapContract);
                    return contract;
                };
                ContractsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ContractsService);
                return ContractsService;
            }());
            exports_1("ContractsService", ContractsService);
        }
    }
});
//# sourceMappingURL=contracts.service.js.map