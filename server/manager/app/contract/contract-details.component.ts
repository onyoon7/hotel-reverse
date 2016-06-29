import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';

import { ContractsService } from '../services/contracts.service';
import { Contract } from '../model/contract';
import { MakeKoreanDatePipe } from '../custom-date.pipe';
import { MakeKoreanDateTimePipe } from '../custom-datetime.pipe';

@Component({
  selector: 'contract-details',
  template: `

    <div class="container" *ngIf="contract">
      <table class="table table-hover table-bordered table-striped">
        <thead>
          <tr>
            <th>예약번호</th>
            <th>고객번호</th>
            <th>체크인</th>
            <th>체크아웃</th>
            <th>지역</th>
            <th>입찰가격</th>
            <th>입찰 시작시간</th>
            <th>입찰 종료시간</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{contract.booking_Num}}</td>
            <td>{{contract.client_Index}}</td>
            <td>{{contract.checkIn_Date | makeKoreanDate }}</td>
            <td>{{contract.checkOut_Date | makeKoreanDate }}</td>
            <td>{{contract.mainArea_Name + ' ' + contract.subArea_Name}}</td>
            <td>{{contract.bid_Price | number }}</td>
            <td>{{contract.bid_StartTime | makeKoreanDateTime }}</td>
            <td>{{contract.bid_EndTime | makeKoreanDateTime }}</td>
          </tr>
        </tbody>
      </table>

      <button class="btn btn-success" (click)="gotoContractsList()">체결 내역으로 돌아가기</button>
    </div>

  `,
  pipes: [ MakeKoreanDatePipe, MakeKoreanDateTimePipe ]
})

export class ContractDetailsComponent implements OnInit {
  @Input() contract : Contract;

  constructor(private contractsService: ContractsService,
              private routeParams: RouteParams,
              private router: Router){
  }

  ngOnInit(){
    let hotel_ID = this.routeParams.get('hotel_ID');
    let booking_Num = Number.parseInt(this.routeParams.get('booking_Num'));

    console.log('getting contract with booking_Num: ', booking_Num);

    this.contractsService
      .getContract(hotel_ID, booking_Num)
      .subscribe(
        c => this.contract = c,
        error => console.error('Error: ' + error),
        () => console.log('Successfully fetched a Contract data!')
      );
  }

  gotoContractsList(){
    let link = ['Contracts'];
    this.router.navigate(link);
  }
}
