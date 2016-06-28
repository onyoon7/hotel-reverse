import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';

import {SignService} from './sign.service';



@Injectable()
export class AuthenticationService {

  constructor(private _router: Router,
              private signService: SignService) { }

  logout() {
    localStorage.removeItem("hotel");
    this._router.navigate(['Login']);
  }

  login(hotel){
    let h = hotel;
    let authenticatedHotel;
    this.signService
      .logIn(hotel)
      .subscribe(
        d => {
          console.log("dddddd => ", d);
          authenticatedHotel = (d.hotel_ID === h.hotel_ID && d.hotel_PW === h.hotel_PW);
          console.log("authenticated hotel is: ", authenticatedHotel);
          if (authenticatedHotel) {
            localStorage.setItem("hotel", JSON.stringify(h));
            this._router.navigate(['Deals']);
            return true;
          }
          return false;
        },
        error => console.log(error),
        () => console.log('Success!!!')
      )
  }

   checkCredentials(): boolean {
    if (localStorage.getItem("hotel") === null){
      this._router.navigate(['Login']);
      return false;
    }
    return true;
  }
}
