import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Deal } from '../deal/deal';
import { hostUrl } from './host-url';


@Injectable()
export class DealsService{
  private baseUrl: string = hostUrl + 'admin';

  constructor(private _http: Http) { }
  
  getAllDeals() : Observable<Deal[]> {
    let deals = this._http
        .get(`${this.baseUrl}/pendingbid`)
        .map(mapDeals);

    return deals;
  }

  getDeal(booking_Num: number) : Observable<Deal> {
    let deal = this._http
        .get(`${this.baseUrl}/pendingbid/${booking_Num}`)
        .map(mapDeal);

    return deal;
  }
}

function mapDeals(response: Response) : Deal[] {
  console.log("response is >>>>>> ");
  console.log(response.json());

  return response.json().map(toDeal);
}

function mapDeal(response: Response) : Deal {
  console.log("single deal >>>>> ");
  console.log(response.json());
  
  return response.json();
}

function toDeal(r:any): Deal {
  let deal = <Deal>({
    booking_Num: <number>r.booking_Num,
    client_Index: <number>r.client_Index,
    hotel_ID: <string>r.hotel_ID,
    checkIn_Date: <string>r.checkIn_Date,
    checkOut_Date: <string>r.checkOut_Date,
    mainArea_Name: <string>r.mainArea_Name,
    subArea_Name: <string>r.subArea_Name,
    bid_Price: <number>r.bid_Price,
    bid_StartTime: <string>r.bid_StartTime,
    bid_EndTime: <string>r.bid_EndTime,
    bid_Transaction: <boolean>r.bid_Transaction
  });

  return deal;
}