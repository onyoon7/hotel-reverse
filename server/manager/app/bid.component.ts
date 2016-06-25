import {Component, Input, OnInit} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';
import {PostService} from './post.service';
import {GetService} from './get.service';

@Component({
   templateUrl: '/app/templates/hotel_info.html',
   directives: [ROUTER_DIRECTIVES]
})


export class HotelBid implements OnInit{
  hotel_ID: string;

  // @Input() hotel_ID : hotel_ID;

  constructor(private _getService: GetService,
              private _router: Router,
              private _routeParams: RouteParams){
    this.hotel_ID = this._routeParams.get('hotel_ID');
  }
  ngOnInit():any {
    console.log("ngOnINit", this.hotel_ID);
    this._getService
        .getBidInfo(this.hotel_ID)
        .subscribe(hotel => console.log("THIS IS HOTEL=>", hotel))
  }
  // data: Object = {};
  // constructor(private _postService: PostService, _router: Router) {};
  // formSubmit() {
  //   console.log(this.data); // {username: "a1", password: "a1"}
  //   this._postService.hotelSignIn(this.data)
  //       .subscribe(
  //         hotel => {alert("Success!"); console.log(hotel)},
  //         err => console.log(err),
  //         () => console.log("done")
  //       )
  //   //navigate to bidding page...
  // }
}
