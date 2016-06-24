import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {PostService} from './post.service';

@Component({
  template:`
  <form (ngSubmit)="formSubmit()">
    <div class="form-group">
      <label for="uname">Username:</label>
      <input type="text" id="uname" class="form-control" [(ngModel)]="data.hotel_ID">
    </div>
    <div class="form-group">
      <label for="pwd">Password:</label>
      <input type="password" id="pwd" class="form-control" [(ngModel)]="data.hotel_PW">
    </div>
    <button type="submit" class="btn-default btn">Login</button>
  </form>
  `,
  directives: [ROUTER_DIRECTIVES]
})


export class hotelSignin {
  data: Object = {};
  constructor(private _postService: PostService, _router: Router) {};
  formSubmit() {
    console.log(this.data); // {username: "a1", password: "a1"}
    this._postService.hotelSignIn(this.data)
        .subscribe(
          hotel => {alert("Success!"); console.log(hotel)},
          err => console.log(err),
          () => console.log("done")
        )


  }
}
