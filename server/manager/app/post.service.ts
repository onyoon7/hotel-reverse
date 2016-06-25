import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Injectable} from 'angular2/core';
import {Hotel} from './Hotel';

@Injectable()

export class PostService {
  private _url_hotel_signin = "http://localhost:4444/hotel/signin";
  private _url_hotel_signup = "http://localhost:4444/hotel/signup";

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

  hotelSignUp(hotel) {
    console.log(hotel);
    
    var hotel_Info = "hotel_ID=" + hotel.hotel_ID + "&hotel_PW=" + hotel.hotel_PW + "&hotel_Name=" + hotel.hotel_Name + "&hotel_Address=" + hotel.hotel_Address + "&mainArea_Name=" + hotel.mainArea_Name + "&subArea_Name=" + hotel.subArea_Name + "&hotel_Rate=" + hotel.hotel_Rate + "&mgr_Name=" + hotel.mgr_Name;

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    return this._http.post(this._url_hotel_signup, hotel_Info, {headers: headers})
        .map(res => res.json());
  }

}
