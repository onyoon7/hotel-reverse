import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {SignService} from '../services/sign.service';

@Component({
  selector: 'signup-form',
  directives: [ROUTER_DIRECTIVES],
  providers: [SignService],
  template: `
    <form (ngSubmit)="formSubmit()">
      <div class="form-group">
        <label for="uname">Username:</label>
        <input type="text" id="uname" class="form-control" [(ngModel)]="data.hotel_ID">
      </div>
      <div class="form-group">
        <label for="pwd">Password:</label>
        <input type="password" id="pwd" class="form-control" [(ngModel)]="data.hotel_PW">
      </div>
      <div class="form-group">
        <label for="hotelname">Hotel Name:</label>
        <input type="text" id="hotelname" class="form-control" [(ngModel)]="data.hotel_Name">
      </div>
      <div class="form-group">
        <label for="address">Hotel Adderss:</label>
        <input type="text" id="address" class="form-control" [(ngModel)]="data.hotel_Address">
      </div>
      <!--선택사항으로 바꿔줄 것!-->
      <div class="form-group">
        <label for="mainarea">MainArea:</label>
        <input type="text" id="mainarea" class="form-control" [(ngModel)]="data.mainArea_Name">
      </div>
      <!--선택사항으로 바꿔줄 것!-->
      <div class="form-group">
        <label for="subarea">SubArea:</label>
        <input type="text" id="subarea" class="form-control" [(ngModel)]="data.subArea_Name">
      </div>
      <!--선택사항으로 바꿔줄 것!-->
      <div class="form-group">
        <label for="rate">Hotel Rate:</label>
        <input type="text" id="rate" class="form-control" [(ngModel)]="data.hotel_Rate">
      </div>
      <div class="form-group">
        <label for="mgrname">Manager Name:</label>
        <input type="text" id="mgrname" class="form-control" [(ngModel)]="data.mgr_Name">
      </div>
      <button type="submit" class="btn-default btn">Submit</button>
    </form>
    `
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
