System.register(['angular2/core', './get.service', './post.service', 'angular2/http', 'angular2/router', './hotel_signin.component'], function(exports_1, context_1) {
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
    var core_1, get_service_1, post_service_1, http_1, router_1, hotel_signin_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (get_service_1_1) {
                get_service_1 = get_service_1_1;
            },
            function (post_service_1_1) {
                post_service_1 = post_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (hotel_signin_component_1_1) {
                hotel_signin_component_1 = hotel_signin_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_getService, _postService) {
                    this._getService = _getService;
                    this._postService = _postService;
                }
                AppComponent.prototype.ngOnInit = function () {
                    this._getService.getHotels()
                        .subscribe(function (hotels) { return console.log(hotels); });
                    this._getService.getHotel()
                        .subscribe(function (hotel) { return console.log(hotel); });
                    this._getService.getPendingBid()
                        .subscribe(function (pendingbids) { return console.log(pendingbids); });
                    this._postService.hotelSignIn({ hotel_ID: 'a1', hotel_PW: 'a1' })
                        .subscribe(function (hotel) { return console.log(hotel); });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n    <router-outlet></router-outlet>\n    ",
                        providers: [get_service_1.GetService, post_service_1.PostService, http_1.HTTP_PROVIDERS],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '/hotel/signin', component: hotel_signin_component_1.hotelSignin, name: 'HotelSignin' }
                    ]), 
                    __metadata('design:paramtypes', [get_service_1.GetService, post_service_1.PostService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map