import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {SignService} from '../services/sign.service';

@Component({
  selector: 'signup-form',
  directives: [ROUTER_DIRECTIVES],
  providers: [SignService],
  templateUrl: './app/template/signup.html',
  styleUrls: ['./app/style/signup.css'],
})

export class SignupComponent {
  public data: Object = {};
  constructor(private signService: SignService,
              private router: Router) { }
  formSubmit() {
    console.log(this.data);
    this.signService
        .signUp(this.data)
        .subscribe(
          h => {
            console.log(h);
            this.router.navigate(['Login']);
          },
          error => console.log(error),
          () => {console.log("done");}
        )
  }
}
