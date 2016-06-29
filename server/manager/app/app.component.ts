import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { LoginComponent } from './sign/login.component';
import { SignupComponent } from './sign/signup.component';
import { SignService } from './services/sign.service';


import { DealsComponent } from './deal/deals.component';
import { DealDetailsComponent } from './deal/deal-details.component';
import { DealsService } from './services/deals.service';

import { ContractsComponent } from './contract/contracts.component';
import { ContractDetailsComponent } from './contract/contract-details.component';
import { ContractsService } from './services/contracts.service';


@Component({
  selector: 'my-app',
  directives: [LoginComponent, SignupComponent, DealsComponent, ROUTER_DIRECTIVES],
  providers: [SignService, DealsService, ContractsService],
  templateUrl: '/app/app.component.html'
})

@RouteConfig([
<<<<<<< 293b7f2dbce22a5b878516d8f6d085afc6b33a2d
  { path: '/deals', name: 'Deals', component: DealsComponent, useAsDefault: true },
  { path: '/deals/:hotel_ID/:booking_Num', name: 'Deal Details', component: DealDetailsComponent },
  { path: '/contracts', name: 'Contracts', component: ContractsComponent },
  { path: '/contracts/:hotel_ID/:booking_Num', name: 'Contract Details', component: ContractDetailsComponent },
  { path: '/login', name: 'Login', component: LoginComponent },
  { path: '/signup', name: 'Signup', component: SignupComponent },
])

export class AppComponent {}
=======
  {path: '/', component: HotelSignin, name:'MainPage'},
  {path: '/hotel/signin', component: HotelSignin, name: 'HotelSignin'},
  {path: '/hotel/signup', component: HotelSignup, name: 'HotelSignup'},
  {path: '/hotel/bid/:hotel_ID/', component: HotelBid, name: 'HotelBid'},
  {path: '/hotel/contracted/:hotel_ID', component: HotelContracted, name: 'HotelContracted'},
  {path: '/hotel/update/:hotel_ID', component: HotelUpdate, name: 'HotelUpdate'}
])

export class AppComponent implements OnInit {

    constructor(private _getService: GetService, private _postService: PostService) {
    }

    ngOnInit() {
        this._getService.getHotels()
            .subscribe(hotels => console.log(hotels));

        this._getService.getHotel()
            .subscribe(hotel => console.log(hotel));

        this._getService.getPendingBid()
            .subscribe(pendingbids => console.log(pendingbids));

        this._postService.hotelSignIn({hotel_ID: 'a1', hotel_PW: 'a1'})
            .subscribe(hotel => console.log(hotel));
    }
}
>>>>>>> (feat) Modified something in coding
