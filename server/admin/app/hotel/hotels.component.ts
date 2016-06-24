import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Hotel } from './hotel';
import { HotelDetailsComponent } from './hotel-details.component';
import { HotelsService } from '../services/hotels.service';

@Component({
  selector: 'hotels-list',
  directives: [HotelDetailsComponent, ROUTER_DIRECTIVES],
  template: `

    <ul>
      <li *ngFor="#hotel of hotels">
        <a href="#" [routerLink]="['Hotel Details', {hotel_ID: hotel.hotel_ID}]">{{hotel.hotel_Name}}</a>
      </li>
    </ul>

  `
})

export class HotelsComponent implements OnInit{
  hotels: Hotel[] = [];
  selectedHotel: Hotel;

  constructor(private hotelsService : HotelsService){ }

  ngOnInit(){
    this.hotelsService
      .getAllHotels()
      .subscribe(
        h => this.hotels = h,
        error => console.error('Error: ' + error),
        () => console.log('Successfully fetched Hotels data!')
      );
  }

  selectHotel(hotel: Hotel){
    this.selectedHotel = hotel;
  }
}