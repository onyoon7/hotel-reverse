import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Injectable} from 'angular2/core';
import {Hotel} from './Hotel';
import {PendingBid} from './PendingBid';

@Injectable()

export class GetService {
  private _url_get_hotels = "http://localhost:4444/admin/hotels";
  private _url_get_hotel = "http://localhost:4444/admin/hotels/a1";
  private _url_get_pendingbid = "http://localhost:4444/admin/pendingbid";

  constructor(private _http: Http) {

  }

  getHotels() : Observable<Hotel[]>{
    return this._http.get(this._url_get_hotels)
        .map(res => res.json());
  }

  getHotel() : Observable<Hotel>{
    return this._http.get(this._url_get_hotel)
        .map(res => res.json());
  }

  getPendingBid() : Observable<PendingBid[]>{
    return this._http.get(this._url_get_pendingbid)
        .map(res => res.json());
  }

}