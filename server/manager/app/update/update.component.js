System.register(['angular2/core', 'angular2/router', '../services/update.service', '../services/authentication.service'], function(exports_1, context_1) {
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
    var core_1, router_1, update_service_1, authentication_service_1;
    var UpdateComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (update_service_1_1) {
                update_service_1 = update_service_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }],
        execute: function() {
            UpdateComponent = (function () {
                function UpdateComponent(updateService, _service, router) {
                    this.updateService = updateService;
                    this._service = _service;
                    this.router = router;
                    this.hotel = {};
                    this.flag = false;
                    this.flag = _service.checkCredentials();
                }
                ;
                UpdateComponent.prototype.ngOnInit = function () {
                    if (this.flag) {
                        var hotel = localStorage.getItem("hotel");
                        console.log('hotel getItem: ', hotel);
                        var temp = JSON.parse(hotel);
                        this.hotel_ID = temp.hotel_ID;
                    }
                };
                UpdateComponent.prototype.update = function () {
                    console.log("Update hotel info => ", this.hotel);
                    this.updateService
                        .update(this.hotel, this.hotel_ID)
                        .subscribe(function (d) { return console.log(d); }, function (error) { return console.log(error); }, function () { return console.log("done"); });
                };
                UpdateComponent.prototype.logout = function () {
                    this._service.logout();
                };
                UpdateComponent = __decorate([
                    core_1.Component({
                        selector: 'update-form',
                        providers: [authentication_service_1.AuthenticationService, update_service_1.UpdateService],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        templateUrl: './app/template/update.html',
                    }), 
                    __metadata('design:paramtypes', [update_service_1.UpdateService, authentication_service_1.AuthenticationService, router_1.Router])
                ], UpdateComponent);
                return UpdateComponent;
            }());
            exports_1("UpdateComponent", UpdateComponent);
        }
    }
});
//# sourceMappingURL=update.component.js.map