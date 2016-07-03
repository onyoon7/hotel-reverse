import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { RouteParams, Router } from 'angular2/router';
import { Response } from 'angular2/http';

import { Contract } from '../model/contract';
import { ContractDetailsComponent } from './contract-details.component';
import { ContractsService } from '../services/contracts.service';
import { AuthenticationService } from '../services/authentication.service';
import { SignService } from '../services/sign.service';

import { MakeKoreanDatePipe } from '../custom-date.pipe';

@Component({
  selector: 'contracts-list',
  directives: [ContractDetailsComponent, ROUTER_DIRECTIVES],
  providers: [AuthenticationService, ContractsService, SignService],
  templateUrl: './app/template/contracts.html',
  pipes: [MakeKoreanDatePipe]
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
          c => {
            c.sort((a: Contract, b: Contract) => {
              let endTime_1: any = new Date(`${a.bid_EndTime}`);
              let endTime_2: any = new Date(`${b.bid_EndTime}`);
              let endTime = endTime_1 - endTime_2;

              return endTime;
            })
            this.contracts = c
            console.log(this.contracts)
          },
          error => console.error('Error: ' + error),
          () => console.log('Successfully fetched Contracts data!')
        );
    }
  }

  selectContract(contract: Contract){
    this.selectedContract = contract;
  }

}
