System.register(['angular2/core', 'angular2/router', '../services/authentication.service', '../services/sign.service'], function(exports_1, context_1) {
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
    var core_1, router_1, authentication_service_1, sign_service_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (sign_service_1_1) {
                sign_service_1 = sign_service_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(service, router) {
                    this.service = service;
                    this.router = router;
                    this.hotel = {};
                    this.errorMsg = '';
                }
                ;
                LoginComponent.prototype.login = function () {
                    if (!this.service.login(this.hotel)) {
                        this.errorMsg = 'Failed to login';
                    }
                };
                LoginComponent.prototype.signup = function () {
                    this.router.navigate(['Signup']);
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'login-form',
                        providers: [authentication_service_1.AuthenticationService, sign_service_1.SignService],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        template: "\n    <div class=\"container\" >\n      <div class=\"panel-body\">\n        <div class=\"row\">\n          <div class=\"input-field col s12\">\n            <label for=\"hotel_ID\">\uC544\uC774\uB514</label><br>\n            <input [(ngModel)]=\"hotel.hotel_ID\" id=\"hotel_ID\"\n                  type=\"text\">\n          </div>\n        </div>\n\n        <div class=\"row\">\n          <div class=\"input-field col s12\">\n            <label for=\"hotel_PW\">\uBE44\uBC00\uBC88\uD638</label><br>\n            <input [(ngModel)]=\"hotel.hotel_PW\" id=\"hotel_PW\"\n                type=\"password\" class=\"validate\">\n          </div>\n        </div>\n\n        <span>{{errorMsg}}</span>\n        <button (click)=\"login()\"\n            class=\"btn btn-primary\"\n            type=\"submit\" name=\"action\">Login</button>\n\n        <span><button (click)=\"signup()\"\n            class=\"btn btn-primary\"\n            type=\"submit\" name=\"action\">Signup</button></span>\n\n      </div>\n    </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [authentication_service_1.AuthenticationService, router_1.Router])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map