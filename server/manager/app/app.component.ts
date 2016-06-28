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
  { path: '/deals', name: 'Deals', component: DealsComponent, useAsDefault: true },
  { path: '/deals/:hotel_ID/:booking_Num', name: 'Deal Details', component: DealDetailsComponent },
  { path: '/contracts', name: 'Contracts', component: ContractsComponent },
  { path: '/contracts/:hotel_ID/:booking_Num', name: 'Contract Details', component: ContractDetailsComponent },
  { path: '/login', name: 'Login', component: LoginComponent },
  { path: '/signup', name: 'Signup', component: SignupComponent },
])

export class AppComponent {}
