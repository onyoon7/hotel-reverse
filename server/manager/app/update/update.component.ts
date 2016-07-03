import {Component, OnInit} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {UpdateService} from '../services/update.service';
import {AuthenticationService} from '../services/authentication.service';


@Component({
  selector: 'update-form',
  providers: [AuthenticationService, UpdateService],
  directives: [ROUTER_DIRECTIVES],
  templateUrl: './app/template/update.html',
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
