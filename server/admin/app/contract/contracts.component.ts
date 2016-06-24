import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Contract } from './contract';
import { ContractDetailsComponent } from './contract-details.component';
import { ContractsService } from '../services/contracts.service';

@Component({
  selector: 'contracts-list',
  directives: [ContractDetailsComponent, ROUTER_DIRECTIVES],
  template: `

    <ul>
      <li *ngFor="#contract of contracts">
        <a href="#" [routerLink]="['Contract Details', {booking_Num: contract.booking_Num}]">{{contract.subArea_Name}}</a>
      </li>
    </ul>

  `
})

export class ContractsComponent implements OnInit{
  contracts: Contract[] = [];
  selectedContract: Contract;

  constructor(private contractsService : ContractsService){ }

  ngOnInit(){
    this.contractsService
      .getAllContracts()
      .subscribe(
        c => this.contracts = c,
        error => console.error('Error: ' + error),
        () => console.log('Successfully fetched Contracts data!')
      );
  }

  selectContract(contract: Contract){
    this.selectedContract = contract;
  }
}
