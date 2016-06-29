import { Injectable } from 'angular2/core';
import { Http, Response, Headers } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Deal } from '../model/deal';


@Injectable()
export class DealsService{
  private baseUrl: string = 'http://localhost:4444/hotel/bid';

  constructor(private _http: Http) { }

  getAllDeals(hotel_ID: string) : Observable<Deal[]> {
    console.log("in getAllDeals, hotel_ID: " + hotel_ID);
    let deals = this._http
        .get(`${this.baseUrl}/${hotel_ID}`)
        .map(mapDeals);

    return deals;
  }

  getDeal(hotel_ID: string, booking_Num: number) : Observable<Deal> {
    console.log("in getDeal, hotel_ID: " + hotel_ID);
    console.log("in getDeal, booking_Num: " + booking_Num);
    let deal = this._http
        .get(`${this.baseUrl}/${hotel_ID}/${booking_Num}`)
        .map(mapDeal);

    return deal;
  }

  getContract(hotel_ID, booking_Num) {
    console.log("All data => ", hotel_ID, booking_Num);

    let hotel_Info = "hotel_ID=" + hotel_ID + "&booking_Num=" + booking_Num;

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    let contract = this._http
        .put(`${this.baseUrl}/${hotel_ID}/${booking_Num}`, hotel_Info, { headers: headers })
        .map(mapDeal);

    return contract;

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
    bid_Transaction: <boolean>r.bid_Transaction,
    imp_uid: <string>r.imp_uid
  });

  return deal;
}
