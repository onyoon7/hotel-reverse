import {Component, OnInit} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {UpdateService} from '../services/update.service';
import {AuthenticationService} from '../services/authentication.service';


@Component({
  selector: 'update-form',
  providers: [AuthenticationService, UpdateService],
  directives: [ROUTER_DIRECTIVES],
  template: `
    <div class="container" >
      <div class="panel-body">
        <div class="row">
          <div class="input-field col s12">
            <label for="hotel_PW">비밀번호</label><br>
            <input [(ngModel)]="hotel.hotel_PW" id="hotel_PW"
                type="password" class="validate" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <label for="hotel_Name">호텔명</label><br>
            <input [(ngModel)]="hotel.hotel_Name" id="hotel_Name"
                type="text" >
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <label for="hotel_Address">주소</label><br>
            <input [(ngModel)]="hotel.hotel_Address" id="hotel_Address"
                type="text">
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <label for="mainArea_Name">지역(시)</label><br>
            <input [(ngModel)]="hotel.mainArea_Name" id="mainArea_Name"
                type="text">
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <label for="subArea_Name">지역(구)</label><br>
            <input [(ngModel)]="hotel.subArea_Name" id="subArea_Name"
                type="text">
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <label for="hotel_Rate">호텔등급</label><br>
            <input [(ngModel)]="hotel.hotel_Rate" id="hotel_Rate"
                type="text">
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <label for="mgr_Name">담당자 성명</label><br>
            <input [(ngModel)]="hotel.mgr_Name" id="mgr_Name"
                type="text">
          </div>
        </div>

        <button (click)="update()"
            class="btn btn-primary"
            type="submit" name="action">완료</button>
        <a (click)="logout()" href="#">logout</a>
      </div>
    </div>
    `
})

export class UpdateComponent implements OnInit{
  hotel: Object = {  };
  flag: boolean = false;
  hotel_ID: string;


  constructor(private updateService:UpdateService,
              private _service:AuthenticationService,
              private router:Router) {
    this.flag = _service.checkCredentials();

  };

  ngOnInit(){
    if (this.flag) {
     let hotel = localStorage.getItem("hotel");
     console.log('hotel getItem: ', hotel);
     let temp = JSON.parse(hotel);
     this.hotel_ID = temp.hotel_ID;
    }
  }

  update(){
    console.log("Update hotel info => ", this.hotel)
    this.updateService
        .update(this.hotel, this.hotel_ID)
        .subscribe(
          d => console.log(d),
          error => console.log(error),
          () => console.log("done")
        )
  }
  logout() {
    this._service.logout();
  }
}
