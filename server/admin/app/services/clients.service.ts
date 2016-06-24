import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Client } from '../client/client';


@Injectable()
export class ClientsService{
  private baseUrl: string = 'http://localhost:4444/admin';

  constructor(private _http: Http) { }
  
  getAllClients() : Observable<Client[]> {
    let clients = this._http
        .get(`${this.baseUrl}/clients`)
        .map(mapClients);

    return clients;
  }

  getClient(client_Email: string) : Observable<Client> {
    let client = this._http
        .get(`${this.baseUrl}/clients/${client_Email}`)
        .map(mapClient);

    return client;
  }
}

function mapClients(response: Response) : Client[] {
  console.log("response is >>>>>> ");
  console.log(response.json());

  return response.json().map(toClient);
}

function mapClient(response: Response) : Client {
  console.log("single client >>>>> ");
  console.log(response.json());

  return response.json();
}

function toClient(r:any): Client {
  let client = <Client>({
    client_Index: <number>r.client_Index,
    client_ID: <string>r.client_ID,
    client_PW: <string>r.client_PW,
    client_Name: <string>r.client_Name,
    client_Email: <string>r.client_Email,
    billingInfo: <string>r.billingInfo,
    member: <boolean>r.member
  });

  return client;
}