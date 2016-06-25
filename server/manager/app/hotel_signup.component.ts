import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {PostService} from './post.service';

@Component({
  selector: 'signup',
  templateUrl: '/app/templates/signupForm.html',
  directives: [ROUTER_DIRECTIVES]
})


export class HotelSignup {
  data: Object = {};
  constructor(private _postService: PostService, private _router: Router) {};
  formSubmit() {
    console.log(this.data);
    this._postService.hotelSignUp(this.data)
        .subscribe(
          hotel => {console.log(hotel)},
          err => console.log(err),
          () => console.log("done")
        )
    //navigate to singin page
    this._router.navigate(['HotelSignin']);
  }
}
