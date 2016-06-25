import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {OnInit} from 'angular2/core';

import {HotelSignin} from './hotel_signin.component';
import {HotelSignup} from './hotel_signup.component';
import {HotelBid} from './bid.component';
import {HotelContracted} from './contracted.component';
import {HotelUpdate} from './update.component';

import {GetService} from './get.service';
import {PostService} from './post.service';

@Component({
    selector: 'my-app',
    template: `
    <router-outlet></router-outlet>
    `,
    providers: [GetService, PostService, HTTP_PROVIDERS],
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  {path: '/', component: HotelSignin, name:'MainPage'},
  {path: '/hotel/signin', component: HotelSignin, name: 'HotelSignin'},
  {path: '/hotel/signup', component: HotelSignup, name: 'HotelSignup'},
  {path: '/hotel/bid/:hotel_ID', component: HotelBid, name: 'HotelBid'},
  {path: '/hotel/contracted/:hotel_ID', component: HotelContracted, name: 'HotelContracted'},
  {path: '/hotel/update/:hotel_ID', component: HotelUpdate, name: 'HotelUpdate'}
])

export class AppComponent implements OnInit {

    constructor(private _getService: GetService, private _postService: PostService) {

    }

    ngOnInit() {
        this._getService.getHotels()
            .subscribe(hotels => console.log(hotels));

        this._getService.getHotel()
            .subscribe(hotel => console.log(hotel));

        this._getService.getPendingBid()
            .subscribe(pendingbids => console.log(pendingbids));

        this._postService.hotelSignIn({hotel_ID: 'a1', hotel_PW: 'a1'})
            .subscribe(hotel => console.log(hotel));
    }
}
