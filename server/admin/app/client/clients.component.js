System.register(['angular2/core', 'angular2/router', './client-details.component', '../services/clients.service'], function(exports_1, context_1) {
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
    var core_1, router_1, client_details_component_1, clients_service_1;
    var ClientsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (client_details_component_1_1) {
                client_details_component_1 = client_details_component_1_1;
            },
            function (clients_service_1_1) {
                clients_service_1 = clients_service_1_1;
            }],
        execute: function() {
            ClientsComponent = (function () {
                function ClientsComponent(clientsService) {
                    this.clientsService = clientsService;
                    this.clients = [];
                }
                ClientsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.clientsService
                        .getAllClients()
                        .subscribe(function (h) { return _this.clients = h; }, function (error) { return console.error('Error: ' + error); }, function () { return console.log('Successfully fetched Clients data!'); });
                };
                ClientsComponent.prototype.selectClient = function (client) {
                    this.selectedClient = client;
                };
                ClientsComponent = __decorate([
                    core_1.Component({
                        selector: 'clients-list',
                        directives: [client_details_component_1.ClientDetailsComponent, router_1.ROUTER_DIRECTIVES],
                        template: "\n  \n    <ul>\n      <li *ngFor=\"#client of clients\">\n        <a href=\"#\" [routerLink]=\"['Client Details', {client_Email: client.client_Email}]\">{{client.client_Name}}</a>\n      </li>\n    </ul>\n  \n  "
                    }), 
                    __metadata('design:paramtypes', [clients_service_1.ClientsService])
                ], ClientsComponent);
                return ClientsComponent;
            }());
            exports_1("ClientsComponent", ClientsComponent);
        }
    }
});
//# sourceMappingURL=clients.component.js.map