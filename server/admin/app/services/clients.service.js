System.register(['angular2/core', 'angular2/http', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, http_1;
    var ClientsService;
    function mapClients(response) {
        console.log("response is >>>>>> ");
        console.log(response.json());
        return response.json().map(toClient);
    }
    function mapClient(response) {
        console.log("single client >>>>> ");
        console.log(response.json());
        return response.json();
    }
    function toClient(r) {
        var client = ({
            client_Index: r.client_Index,
            client_ID: r.client_ID,
            client_PW: r.client_PW,
            client_Name: r.client_Name,
            client_Email: r.client_Email,
            billingInfo: r.billingInfo,
            member: r.member
        });
        return client;
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            ClientsService = (function () {
                function ClientsService(_http) {
                    this._http = _http;
                    this.baseUrl = 'http://localhost:4444/admin';
                }
                ClientsService.prototype.getAllClients = function () {
                    var clients = this._http
                        .get(this.baseUrl + "/clients")
                        .map(mapClients);
                    return clients;
                };
                ClientsService.prototype.getClient = function (client_Email) {
                    var client = this._http
                        .get(this.baseUrl + "/clients/" + client_Email)
                        .map(mapClient);
                    return client;
                };
                ClientsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ClientsService);
                return ClientsService;
            }());
            exports_1("ClientsService", ClientsService);
        }
    }
});
//# sourceMappingURL=clients.service.js.map