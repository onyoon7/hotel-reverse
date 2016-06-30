import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';

import { Deal } from '../model/deal';
import { DealDetailsComponent } from './deal-details.component';
import { DealsService } from '../services/deals.service';
import { AuthenticationService } from '../services/authentication.service';
import { SignService } from '../services/sign.service';

import { MakeKoreanDateTimePipe } from '../custom-datetime.pipe';

@Component({
  selector: 'deals-list',
  directives: [DealDetailsComponent, ROUTER_DIRECTIVES],
  providers: [AuthenticationService, DealsService, SignService],
  template: `

    <ul>
      <li *ngFor="#deal of deals">
        <a href="#" [routerLink]="['Deal Details', {hotel_ID: hotel_ID, booking_Num: deal.booking_Num}]">{{deal.bid_EndTime | makeKoreanDateTime}} </a>
        {{deal.bid_Price | number}}
      </li>
    </ul>
    <a (click)="logout()" href="#">logout</a>
  `,
  pipes: [MakeKoreanDateTimePipe]
})

export class DealsComponent implements OnInit{
  deals: Deal[] = [];
  selectedDeal: Deal;
  flag: boolean = false;
  hotel_ID: string;

  constructor(private dealsService : DealsService,
              private routeParams : RouteParams,
              private router : Router,
              private _service : AuthenticationService){
    this.flag = _service.checkCredentials();
  }

  ngOnInit(){

     if (this.flag) {
      let hotel = localStorage.getItem("hotel");
      console.log('hotel getItem: ', hotel);
      let temp = JSON.parse(hotel);
      this.hotel_ID = temp.hotel_ID;

      this.dealsService
        .getAllDeals(this.hotel_ID)
        .subscribe(
          d => {
            d.sort((a: Deal, b: Deal) => {
              let endTime_1: any = new Date(`${a.bid_EndTime}`);
              let endTime_2: any = new Date(`${b.bid_EndTime}`);
              let endTime = endTime_1 - endTime_2;

              return endTime;
            })

            this.deals = d;
          },
          error => console.error('Error: ' + error),
          () => console.log('Successfully fetched all Deals!', this.deals)
        );
     }

  }

  logout() {
    this._service.logout();
  }
}
