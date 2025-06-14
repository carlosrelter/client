import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../shared/models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  baseURL = `${enviroment.apiURL}clients`;

  token = sessionStorage.getItem('auth-token');
  name = sessionStorage.getItem('name');

  constructor(private http: HttpClient) {}

  public getClients(): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.baseURL}`, {headers: {'Authorization': `Bearer ${this.token}`}});
  }

  public postClient(client:Client): Observable<Client>{
    return this.http.post<Client>(`${this.baseURL}`, client, {headers: {'Authorization': `Bearer ${this.token}`}} );
  }

  public putClient(id:number,client: Client): Observable<Client>{
    return this.http.put<Client>(`${this.baseURL}/${id}`, client, {headers: {'Authorization': `Bearer ${this.token}`}});
  }

  public deleteClientById(id:number): Observable<Client>{
    return this.http.delete<Client>(`${this.baseURL}/${id}`, {headers: {'Authorization': `Bearer ${this.token}`}});
  }

}
