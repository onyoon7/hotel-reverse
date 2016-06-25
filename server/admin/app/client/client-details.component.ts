import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';

import { ClientsService } from '../services/clients.service';
import { Client } from './client';

@Component({
  selector: 'client-details',
  template: `

    <div class="container" *ngIf="client">
      <table class="table table-hover table-bordered table-striped">
        <thead>
          <tr>
            <th>고객 번호</th>
            <th>아이디</th>
            <th>비밀번호</th>
            <th>이름</th>
            <th>이메일</th>
            <th>결제 정보</th>
            <th>회원 여부</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{client.client_Index}}</td>
            <td>{{client.client_ID}}</td>
            <td>{{client.client_PW}}</td>
            <td>{{client.client_Name}}</td>
            <td>{{client.client_Email}}</td>
            <td>{{client.billingInfo}}</td>
            <td>{{client.member}}</td>
          </tr>
        </tbody>
      </table>

      <button class="btn btn-success" (click)="gotoClientsList()">전체 고객 리스트</button>
    </div>
  `
})

export class ClientDetailsComponent implements OnInit {
  @Input() client : Client;

  constructor(private clientsService: ClientsService,
              private routeParams: RouteParams,
              private router: Router) {
  }
  
  ngOnInit() {
    let client_Email = this.routeParams.get('client_Email');

    console.log('getting client with client_Email: ', client_Email);

    this.clientsService
      .getClient(client_Email)
      .subscribe(
        c => this.client = c,
        error => console.error('Error: ' + error),
        () => console.log('Successfully fetched a Client data!')
      );
  }

  gotoClientsList() {
    let link = ['Clients'];
    this.router.navigate(link);
  }
}
