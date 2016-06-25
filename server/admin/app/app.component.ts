// angular2 system components
import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { RouteParams, Router} from 'angular2/router';

/*
  custom components (구조)
  - 전제 세트를 리스트로 표시해주는 component (DealsComponent)
  - 세트 내의 각 항목을 클릭했을 때 나타나는 세부 항목을 표시해주는 component (DealDetailsComponent)
  - Restful API를 이용해 서버에게 데이터를 요청하거나 보내는 서비스 (DealsService)
 */
import { DealsComponent} from './deal/deals.component';
import { DealDetailsComponent } from './deal/deal-details.component';
import { DealsService } from './services/deals.service';

import { ContractsComponent } from './contract/contracts.component';
import { ContractDetailsComponent } from './contract/contract-details.component';
import { ContractsService } from './services/contracts.service';

import { HotelsComponent } from './hotel/hotels.component';
import { HotelDetailsComponent } from './hotel/hotel-details.component';
import { HotelsService } from './services/hotels.service';

import { ClientsComponent } from './client/clients.component';
import { ClientDetailsComponent } from './client/client-details.component';
import { ClientsService } from './services/clients.service';

// @Component: 컴포넌트 데코레이터, AppComponent를 컴포넌트 타입의 클래스로 만들어줌
@Component({
  selector: 'my-app',
  templateUrl: '/app/app.component.html',
  directives: [DealsComponent, HotelsComponent, ClientsComponent, ROUTER_DIRECTIVES],
  providers: [DealsService, HotelsService, ContractsService, ClientsService]
})

// Route config: 경로를 컴포넌트로 매칭해주는 역할
@RouteConfig([
  { path: '/deals', name: 'Deals', component: DealsComponent, useAsDefault: true },
  { path: '/deal/:booking_Num', name: 'Deal Details', component: DealDetailsComponent },
  { path: '/contracts', name: 'Contracts', component: ContractsComponent},
  { path: '/contracts/:booking_Num', name: 'Contract Details', component: ContractDetailsComponent},
  { path: '/hotels', name: 'Hotels', component: HotelsComponent },
  { path: '/hotels/:hotel_ID', name: 'Hotel Details', component: HotelDetailsComponent },
  { path: '/clients', name: 'Clients', component: ClientsComponent },
  { path: '/clients/:client_Email', name: 'Client Details', component: ClientDetailsComponent },
  { path: '/*other', name: 'Other', redirectTo: ['Deals'] }
])

export class AppComponent { }
