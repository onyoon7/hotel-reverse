import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { RouteParams, Router } from 'angular2/router';
import { Response } from 'angular2/http';

import { Contract } from '../model/contract';
import { ContractDetailsComponent } from './contract-details.component';
import { ContractsService } from '../services/contracts.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'contracts-list',
  directives: [ContractDetailsComponent, ROUTER_DIRECTIVES],
  providers: [AuthenticationService, ContractsService],
  template: `

    <ul>
      <li *ngFor="#contract of contracts">
        <a href="#" [routerLink]="['Contract Details', {hotel_ID: hotel_ID, booking_Num: contract.booking_Num}]">{{contract.subArea_Name}}</a>
      </li>
    </ul>
    <a (click)="logout()" href="#">logout</a>
  `
})

export class ContractsComponent implements OnInit{
  contracts: Contract[] = [];
  selectedContract: Contract;
  flag: boolean = false;
  hotel_ID: string;

  constructor(private contractsService : ContractsService,
              private routeParams : RouteParams,
              private router : Router,
              private _service : AuthenticationService) {
    this.flag = _service.checkCredentials();
  }

  ngOnInit(){
    if (this.flag) {
      let hotel = localStorage.getItem("hotel");
      console.log('hotel getItem: ', hotel);
      let temp = JSON.parse(hotel);
      this.hotel_ID = temp.hotel_ID;

      console.log('hotel_ID: ', this.hotel_ID);

      this.contractsService
        .getAllContracts(this.hotel_ID)
        .subscribe(
          c => this.contracts = c,
          error => console.error('Error: ' + error),
          () => console.log('Successfully fetched Contracts data!')
        );
    }
  }

  selectContract(contract: Contract){
    this.selectedContract = contract;
  }

  logout() {
    this._service.logout();
  }
}
