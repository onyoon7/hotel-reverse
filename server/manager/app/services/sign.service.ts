import { Injectable } from 'angular2/core';
import { Http, Response, Headers } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Deal } from '../model/deal';
import { Hotel } from '../model/hotel';
import { hostUrl } from './host-url';

@Injectable()

export class SignService {
  private baseUrl: string = 'http://localhost:4444/hotel'
  // private baseUrl: string = hostUrl + "hotel";

  constructor(private _http: Http) { }

  logIn(data) : Observable<Hotel> {
    let hotel_ID = data.hotel_ID;
    let hotel_PW = data.hotel_PW;
    let hotel_Info = "hotel_ID=" + hotel_ID + "&hotel_PW=" + hotel_PW;

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    let hotel = this._http
        .post(`${this.baseUrl}/signin`, hotel_Info, {headers: headers})
        .map(mapHotel);

    return hotel;
  }

  signUp(hotel) {
    console.log("THIS IS SGNUP DATA => ", hotel);

    let hotel_Info = "hotel_ID=" + hotel.hotel_ID + "&hotel_PW=" + hotel.hotel_PW + "&hotel_Name=" + hotel.hotel_Name + "&hotel_Address=" + hotel.hotel_Address + "&mainArea_Name=" + hotel.mainArea_Name + "&subArea_Name=" + hotel.subArea_Name + "&hotel_Rate=" + hotel.hotel_Rate + "&mgr_Name=" + hotel.mgr_Name;

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    return this._http.post(`${this.baseUrl}/signup`, hotel_Info, {headers: headers})
        .map(mapHotel);
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
