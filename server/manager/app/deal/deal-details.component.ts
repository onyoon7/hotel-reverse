import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';

import { DealsService } from '../services/deals.service';
import { Deal } from '../model/deal';

// import pipe for expressing date, datetime
import { MakeKoreanDatePipe } from '../custom-date.pipe';
import { MakeKoreanDateTimePipe } from '../custom-datetime.pipe';

@Component({
  selector: 'deal-details',
  template: `

    <div class="container" *ngIf="deal">
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
            <td>{{deal.booking_Num}}</td>
            <td>{{deal.client_Index}}</td>
            <td>{{deal.checkIn_Date | makeKoreanDate }}</td>
            <td>{{deal.checkOut_Date | makeKoreanDate }}</td>
            <td>{{deal.mainArea_Name + ' ' + deal.subArea_Name }}</td>
            <td>{{deal.bid_Price | number }}</td>
            <td>{{deal.bid_StartTime | makeKoreanDateTime }}</td>
            <td>{{deal.bid_EndTime | makeKoreanDateTime }}</td>
            <button class="btn btn-success" (click)="getContract()">거래</button>
          </tr>
        </tbody>
      </table>

      <button class="btn btn-success" (click)="gotoDealsList()">거래 내역으로 돌아가기</button>
    </div>

  `,
  pipes: [ MakeKoreanDatePipe, MakeKoreanDateTimePipe ]
})

export class DealDetailsComponent implements OnInit {
  @Input() deal : Deal;
  hotel_ID: string;
  booking_Num: number;

  constructor(private dealsService: DealsService,
              private routeParams: RouteParams,
              private router: Router){
  }

  ngOnInit(){
    this.hotel_ID = this.routeParams.get('hotel_ID');
    this.booking_Num = Number.parseInt(this.routeParams.get('booking_Num'));

    console.log('getting deal with booking_Num: ', this.booking_Num);

    this.dealsService
      .getDeal(this.hotel_ID, this.booking_Num)
      .subscribe(
        d => this.deal = d,
        error => console.error('Error: ' + error),
        () => console.log('Successfully fetched a Deal!')
      );
  }

  gotoDealsList(){
    let link = ['Deals'];
    this.router.navigate(link);
  }

  getContract(){
    this.dealsService
      .getContract(this.hotel_ID, this.booking_Num)
      .subscribe(
        d => console.log(d),
        error => console.log(error),
        () => console.log("done")
      )
  }
}
