import {Component} from 'angular2/core';
import {GetService} from './get.service';
import {PostService} from './post.service';
import {HTTP_PROVIDERS} from 'angular2/http';
import {OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {hotelSignin} from './hotel_signin.component';

@Component({
    selector: 'my-app',
    template: `
    <router-outlet></router-outlet>
    `,
    providers: [GetService, PostService, HTTP_PROVIDERS],
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  {path: '/hotel/signin', component: hotelSignin, name: 'HotelSignin'}
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
