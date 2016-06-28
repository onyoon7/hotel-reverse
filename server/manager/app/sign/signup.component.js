System.register(['angular2/core', 'angular2/router', '../services/sign.service'], function(exports_1, context_1) {
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
    var core_1, router_1, sign_service_1;
    var SignupComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (sign_service_1_1) {
                sign_service_1 = sign_service_1_1;
            }],
        execute: function() {
            SignupComponent = (function () {
                function SignupComponent(signService, router) {
                    this.signService = signService;
                    this.router = router;
                    this.data = {};
                }
                SignupComponent.prototype.formSubmit = function () {
                    var _this = this;
                    console.log(this.data);
                    this.signService
                        .signUp(this.data)
                        .subscribe(function (h) {
                        console.log(h);
                        _this.router.navigate(['Login']);
                    }, function (error) { return console.log(error); }, function () { console.log("done"); });
                };
                SignupComponent = __decorate([
                    core_1.Component({
                        selector: 'signup-form',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [sign_service_1.SignService],
                        template: "\n    <form (ngSubmit)=\"formSubmit()\">\n      <div class=\"form-group\">\n        <label for=\"uname\">Username:</label>\n        <input type=\"text\" id=\"uname\" class=\"form-control\" [(ngModel)]=\"data.hotel_ID\">\n      </div>\n      <div class=\"form-group\">\n        <label for=\"pwd\">Password:</label>\n        <input type=\"password\" id=\"pwd\" class=\"form-control\" [(ngModel)]=\"data.hotel_PW\">\n      </div>\n      <div class=\"form-group\">\n        <label for=\"hotelname\">Hotel Name:</label>\n        <input type=\"text\" id=\"hotelname\" class=\"form-control\" [(ngModel)]=\"data.hotel_Name\">\n      </div>\n      <div class=\"form-group\">\n        <label for=\"address\">Hotel Adderss:</label>\n        <input type=\"text\" id=\"address\" class=\"form-control\" [(ngModel)]=\"data.hotel_Address\">\n      </div>\n      <!--\uC120\uD0DD\uC0AC\uD56D\uC73C\uB85C \uBC14\uAFD4\uC904 \uAC83!-->\n      <div class=\"form-group\">\n        <label for=\"mainarea\">MainArea:</label>\n        <input type=\"text\" id=\"mainarea\" class=\"form-control\" [(ngModel)]=\"data.mainArea_Name\">\n      </div>\n      <!--\uC120\uD0DD\uC0AC\uD56D\uC73C\uB85C \uBC14\uAFD4\uC904 \uAC83!-->\n      <div class=\"form-group\">\n        <label for=\"subarea\">SubArea:</label>\n        <input type=\"text\" id=\"subarea\" class=\"form-control\" [(ngModel)]=\"data.subArea_Name\">\n      </div>\n      <!--\uC120\uD0DD\uC0AC\uD56D\uC73C\uB85C \uBC14\uAFD4\uC904 \uAC83!-->\n      <div class=\"form-group\">\n        <label for=\"rate\">Hotel Rate:</label>\n        <input type=\"text\" id=\"rate\" class=\"form-control\" [(ngModel)]=\"data.hotel_Rate\">\n      </div>\n      <div class=\"form-group\">\n        <label for=\"mgrname\">Manager Name:</label>\n        <input type=\"text\" id=\"mgrname\" class=\"form-control\" [(ngModel)]=\"data.mgr_Name\">\n      </div>\n      <button type=\"submit\" class=\"btn-default btn\">Submit</button>\n    </form>\n    "
                    }), 
                    __metadata('design:paramtypes', [sign_service_1.SignService, router_1.Router])
                ], SignupComponent);
                return SignupComponent;
            }());
            exports_1("SignupComponent", SignupComponent);
        }
    }
});
//# sourceMappingURL=signup.component.js.map