import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Contract } from '../contract/contract';


@Injectable()
export class ContractsService{
  private baseUrl: string = 'http://localhost:4444/hotel/contracted';

  constructor(private _http: Http) { }

  getAllContracts(hotel_ID: string) : Observable<Contract[]> {
    console.log("in getAllContracts, hotel_ID: " + hotel_ID);
    let contracts = this._http
        .get(`${this.baseUrl}/${hotel_ID}`)
        .map(mapContracts);

    return contracts;
  }

  getContract(hotel_ID: string, booking_Num: number) : Observable<Contract> {
    console.log("in getContract, hotel_ID: " + hotel_ID);
    console.log("in getContract, booking_Num: " + booking_Num);
    let contract = this._http
        .get(`${this.baseUrl}/${hotel_ID}/${booking_Num}`)
        .map(mapContract);

    return contract;
  }
}

function mapContracts(response: Response) : Contract[] {
  console.log("response is >>>>>> ");
  console.log(response.json());

  return response.json().map(toContract);
}

function mapContract(response: Response) : Contract {
  console.log("single deal >>>>> ");
  console.log(response.json());

  return response.json();
}

function toContract(r:any): Contract {
  let contract = <Contract>({
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

  return contract;
}
