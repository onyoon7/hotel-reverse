import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Hotel } from '../hotel/hotel';


@Injectable()
export class HotelsService{
  private baseUrl: string = 'http://localhost:4444/admin';

  constructor(private _http: Http) { }
  
  getAllHotels() : Observable<Hotel[]> {
    let hotels = this._http
        .get(`${this.baseUrl}/hotels`)
        .map(mapHotels);

    return hotels;
  }

  getHotel(hotel_ID: string) : Observable<Hotel> {
    let hotel = this._http
        .get(`${this.baseUrl}/hotels/${hotel_ID}`)
        .map(mapHotel);

    return hotel;
  }
}

function mapHotels(response: Response) : Hotel[] {
  console.log("response is >>>>>> ");
  console.log(response.json());

  return response.json().map(toHotel);
}

function mapHotel(response: Response) : Hotel {
  console.log("single hotel >>>>> ");
  console.log(response.json());

  return response.json();
}

function toHotel(r:any): Hotel {
  let hotel = <Hotel>({
    hotel_Index: <number>r.hotel_Index,
    hotel_ID: <string>r.hotel_ID,
    hotel_PW: <string>r.hotel_PW,
    hotel_Name: <string>r.hotel_Name,
    mainArea_Name: <string>r.mainArea_Name,
    subArea_Name: <string>r.subArea_Name,
    hotel_Rate: <number>r.hotel_Rate,
    mgr_Name: <string>r.mgr_Name
  });

  return hotel;
}
