import { Injectable } from 'angular2/core';
import { Http, Response, Headers } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Deal } from '../model/deal';
import { Hotel } from '../model/hotel';

@Injectable()

export class UpdateService {
  private baseUrl: string = "http://localhost:4444/hotel";

  constructor(private _http: Http) { }

  update(hotel, hotel_ID) {
    let id = hotel_ID;
    console.log("This is UPDATE data => ", hotel);

    let hotel_Info = "hotel_PW=" + hotel.hotel_PW + "&hotel_Name=" + hotel.hotel_Name + "&hotel_Address=" + hotel.hotel_Address + "&mainArea_Name=" + hotel.mainArea_Name + "&subArea_Name=" + hotel.subArea_Name + "&hotel_Rate=" + hotel.hotel_Rate + "&mgr_Name=" + hotel.mgr_Name;

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    return this._http
        .post(`${this.baseUrl}/update/${id}`, hotel_Info, {headers: headers})
        .map(mapHotel);
  }

}

function mapHotel(response: Response) : Hotel {
  console.log("single hotel >>>>> ");
  console.log(response.json());

  return response.json();
}
