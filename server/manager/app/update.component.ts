import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {PostService} from './post.service';

@Component({
   templateUrl: '/app/templates/hotel_info.html',
   directives: [ROUTER_DIRECTIVES]
})


export class HotelUpdate {
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
