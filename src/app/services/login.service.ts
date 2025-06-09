import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroments';
import { User } from '../shared/models/user';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../shared/types/login-response.type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseURL=`${enviroment.apiURL}auth`;

  constructor(private http: HttpClient) { }

  public login(email: string, password: string){
    return this.http.post<LoginResponse>(`${this.baseURL}/login`,{email, password}).pipe(
      tap((value)=>{
        sessionStorage.setItem("auth-token", value.token);
        sessionStorage.setItem("name", value.name);
      })
    );
  }

  public register(user: User):Observable<User>{
    return this.http.post<User>(`${this.baseURL}/register`, user);
  }
}
