import {Component} from 'angular2/core';
import {GetService} from './get.service';
import {PostService} from './post.service';
import {HTTP_PROVIDERS} from 'angular2/http';
import {OnInit} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: `
    `,
    providers: [GetService, PostService, HTTP_PROVIDERS]
})
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