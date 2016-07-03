import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';

import { ContractsService } from '../services/contracts.service';
import { Contract } from '../model/contract';

import { MakeKoreanDatePipe } from '../custom-date.pipe';
import { MakeKoreanDateTimePipe } from '../custom-datetime.pipe';

@Component({
  selector: 'contract-details',
  templateUrl: './app/template/contract-details.html',
  pipes: [ MakeKoreanDatePipe, MakeKoreanDateTimePipe ]
})

export class ContractDetailsComponent implements OnInit {
  @Input() contract : Contract;
  hotel_ID: string;
  booking_Num: number;
  constructor(private contractsService: ContractsService,
              private routeParams: RouteParams,
              private router: Router){
  }

  ngOnInit(){
    this.hotel_ID = this.routeParams.get('hotel_ID');
    this.booking_Num = Number.parseInt(this.routeParams.get('booking_Num'));

    console.log('getting contract with booking_Num: ', this.booking_Num);

    this.contractsService
      .getContract(this.hotel_ID, this.booking_Num)
      .subscribe(
        c => {
          this.contract = c
          console.log("dddddddddddddddd", this.contract)
        },
        error => console.error('Error: ' + error),
        () => console.log('Successfully fetched a Contract data!')
      );
  }

  gotoContractsList(){
    let link = ['Contracts'];
    this.router.navigate(link);
  }
}
