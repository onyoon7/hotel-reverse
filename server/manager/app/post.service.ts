import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Injectable} from 'angular2/core';
import {Hotel} from './Hotel';

@Injectable()

export class PostService {
  private _url_hotel_signin = "http://localhost:4444/hotel/signin";

  constructor(private _http: Http) {

  }

  hotelSignIn(hotel) {
    var hotel_ID = hotel.hotel_ID;
    var hotel_PW = hotel.hotel_PW;

    var hotel_Info = "hotel_ID=" + hotel_ID + "&hotel_PW=" + hotel_PW;

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    return this._http.post(this._url_hotel_signin, hotel_Info, {headers: headers})
        .map(res => res.json());
  }

}
