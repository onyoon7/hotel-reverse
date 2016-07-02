import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {AuthenticationService} from '../services/authentication.service';
import {SignService} from '../services/sign.service';

@Component({
  selector: 'login-form',
  providers: [AuthenticationService, SignService],
  directives: [ROUTER_DIRECTIVES],
  templateUrl: './app/template/login.html',
  styleUrls: ['./app/style/login.css'],
})

export class LoginComponent {

  public hotel: Object = {};
  public errorMsg = '';

  constructor(private service:AuthenticationService,
              private router:Router) {};

  login() {
    if(!this.service.login(this.hotel)){
        this.errorMsg = 'Failed to login';
        // alert("plz try again");
    }
  }
  signup() {
    this.router.navigate(['Signup']);
  }
}
