import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';

import { HotelsService } from '../services/hotels.service';
import { Hotel } from './hotel';

@Component({
  selector: 'hotel-details',
  template: `

    <div class="container" *ngIf="hotel">
      <table class="table table-hover table-bordered table-striped">
        <thead>
          <tr>
            <th>호텔 번호</th>
            <th>아이디</th>
            <th>비밀번호</th>
            <th>호텔 이름</th>
            <th>주소</th>
            <th>지역(대분류)</th>
            <th>지역(소분류)</th>
            <th>등급</th>
            <th>담당자</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{hotel.hotel_Index}}</td>
            <td>{{hotel.hotel_ID}}</td>
            <td>{{hotel.hotel_PW}}</td>
            <td>{{hotel.hotel_Name}}</td>
            <td>{{hotel.hotel_Address}}</td>
            <td>{{hotel.mainArea_Name}}</td>
            <td>{{hotel.subArea_Name}}</td>
            <td>{{hotel.hotel_Rate}}</td>
            <td>{{hotel.mgr_Name}}</td>
          </tr>
        </tbody>
      </table>

      <button class="btn btn-success" (click)="gotoHotelsList()">전체 호텔 리스트</button>
    </div>
  `
})
export class HotelDetailsComponent implements OnInit {
  @Input() hotel : Hotel;

  constructor(private hotelsService: HotelsService,
              private routeParams: RouteParams,
              private router: Router) {
  }

  ngOnInit(){
    let hotel_ID = this.routeParams.get('hotel_ID');

    console.log('getting hotel with hotel_ID: ', hotel_ID);

    this.hotelsService
      .getHotel(hotel_ID)
      .subscribe(
        h => this.hotel = h,
        error => console.error('Error: ' + error),
        () => console.log('Successfully fetched a Hotel data!')
      );
  }
  
  gotoHotelsList(){
    let link = ['Hotels'];
    this.router.navigate(link);
  }
}
