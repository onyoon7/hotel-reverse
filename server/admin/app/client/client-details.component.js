System.register(['angular2/core', 'angular2/router', '../services/clients.service'], function(exports_1, context_1) {
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
    var core_1, router_1, clients_service_1;
    var ClientDetailsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (clients_service_1_1) {
                clients_service_1 = clients_service_1_1;
            }],
        execute: function() {
            ClientDetailsComponent = (function () {
                function ClientDetailsComponent(clientsService, routeParams, router) {
                    this.clientsService = clientsService;
                    this.routeParams = routeParams;
                    this.router = router;
                }
                ClientDetailsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var client_Email = this.routeParams.get('client_Email');
                    console.log('getting client with client_Email: ', client_Email);
                    this.clientsService
                        .getClient(client_Email)
                        .subscribe(function (c) { return _this.client = c; }, function (error) { return console.error('Error: ' + error); }, function () { return console.log('Successfully fetched a Client data!'); });
                };
                ClientDetailsComponent.prototype.gotoClientsList = function () {
                    var link = ['Clients'];
                    this.router.navigate(link);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], ClientDetailsComponent.prototype, "client", void 0);
                ClientDetailsComponent = __decorate([
                    core_1.Component({
                        selector: 'client-details',
                        template: "\n\n    <div class=\"container\" *ngIf=\"client\">\n      <table class=\"table table-hover table-bordered table-striped\">\n        <thead>\n          <tr>\n            <th>\uACE0\uAC1D \uBC88\uD638</th>\n            <th>\uC544\uC774\uB514</th>\n            <th>\uBE44\uBC00\uBC88\uD638</th>\n            <th>\uC774\uB984</th>\n            <th>\uC774\uBA54\uC77C</th>\n            <th>\uACB0\uC81C \uC815\uBCF4</th>\n            <th>\uD68C\uC6D0 \uC5EC\uBD80</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>{{client.client_Index}}</td>\n            <td>{{client.client_ID}}</td>\n            <td>{{client.client_PW}}</td>\n            <td>{{client.client_Name}}</td>\n            <td>{{client.client_Email}}</td>\n            <td>{{client.billingInfo}}</td>\n            <td>{{client.member}}</td>\n          </tr>\n        </tbody>\n      </table>\n\n      <button class=\"btn btn-success\" (click)=\"gotoClientsList()\">\uC804\uCCB4 \uACE0\uAC1D \uB9AC\uC2A4\uD2B8</button>\n    </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [clients_service_1.ClientsService, router_1.RouteParams, router_1.Router])
                ], ClientDetailsComponent);
                return ClientDetailsComponent;
            }());
            exports_1("ClientDetailsComponent", ClientDetailsComponent);
        }
    }
});
//# sourceMappingURL=client-details.component.js.map