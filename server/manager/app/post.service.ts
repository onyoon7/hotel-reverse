import {Http} from 'angular2/http';
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
    return this._http.post(this._url_hotel_signin, JSON.stringify(hotel))
        .map(res => res.json());
  }

}