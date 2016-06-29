import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {AuthenticationService} from '../services/authentication.service';
import {SignService} from '../services/sign.service';

@Component({
  selector: 'login-form',
  providers: [AuthenticationService, SignService],
  directives: [ROUTER_DIRECTIVES],
  template: `
    <div class="container" >
      <div class="panel-body">
        <div class="row">
          <div class="input-field col s12">
            <label for="hotel_ID">아이디</label><br>
            <input [(ngModel)]="hotel.hotel_ID" id="hotel_ID"
                  type="text">
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <label for="hotel_PW">비밀번호</label><br>
            <input [(ngModel)]="hotel.hotel_PW" id="hotel_PW"
                type="password" class="validate">
          </div>
        </div>

        <span>{{errorMsg}}</span>
        <button (click)="login()"
            class="btn btn-primary"
            type="submit" name="action">Login</button>

        <span><button (click)="signup()"
            class="btn btn-primary"
            type="submit" name="action">Signup</button></span>

      </div>
    </div>
    `
})

export class LoginComponent {

  public hotel: Object = {};
  public errorMsg = '';

  constructor(private service:AuthenticationService,
              private router:Router) {};

  login() {
    if(!this.service.login(this.hotel)){
        this.errorMsg = 'Failed to login';
    }
  }
  signup() {
    this.router.navigate(['Signup']);
  }
}
