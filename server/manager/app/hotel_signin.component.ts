import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';
import {PostService} from './post.service';

@Component({
   templateUrl: '/app/templates/loginForm.html',
   directives: [ROUTER_DIRECTIVES]
})


export class HotelSignin {
  data: Object = {};


  constructor(private _postService: PostService, private _router: Router, params: RouteParams) {
  };
  formSubmit() {
    console.log(this.data); // {username: "a1", password: "a1"}
    this._postService.hotelSignIn(this.data)
        .subscribe(
          hotel => {
// navigate(linkParams: any[]): Promise<any>;
/**
 * Navigate to a URL. Returns a promise that resolves when navigation is complete.
 * It's preferred to navigate with `navigate` instead of this method, since URLs are more brittle.
 *
 * If the given URL begins with a `/`, router will navigate absolutely.
 * If the given URL does not begin with `/`, the router will navigate relative to this component.
 */
            console.log(hotel.hotel_ID);
            // this.router.navigate(['/MyApp', 'MyProjects', 'ProjectDetails', {id: project.id}]
            this._router.navigate(['HotelBid', { hotel_ID : hotel.hotel_ID} ]);
          },
          err => { this._router.navigate(['HotelSignin']) },
          () => { console.log("YES!"); }
        )
    //navigate to bidding page...
  }
  signUp() {
    this._router.navigate(['HotelSignup']);
  }
}
