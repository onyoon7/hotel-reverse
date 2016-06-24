import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Deal } from './deal';
import { DealDetailsComponent } from './deal-details.component';
import { DealsService } from '../services/deals.service';

@Component({
  selector: 'deals-list',
  template: `

    <ul>
      <li *ngFor="#deal of deals">
        <a href="#" [routerLink]="['Deal Details', {booking_Num: deal.booking_Num}]">{{deal.subArea_Name}}</a>
      </li>
    </ul>

  `,
  directives: [DealDetailsComponent, ROUTER_DIRECTIVES]
})

export class DealsComponent implements OnInit{
  deals: Deal[] = [];
  selectedDeal: Deal;

  constructor(private dealsService : DealsService){ }

  ngOnInit(){
    this.dealsService
      .getAllDeals()
      .subscribe(
        d => this.deals = d,
        error => console.error('Error: ' + error),
        () => console.log('Successfully fetched all Deals!')
      );
  }

  selectDeal(deal: Deal){
    this.selectedDeal = deal;
  }
}
