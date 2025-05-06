import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResquest } from '../../interfaces/auth-request';
import { AuthResponse } from '../../interfaces/auth-response';
import { RegisterRequest } from '../../interfaces/register-request';
import { UserResponse } from '../../interfaces/user-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/1.0/auth';
  private _token: string | undefined;
  private _refresh_token: string | undefined;
  private _user: any = {
    isAuth: false, 
    username: undefined,
    role: undefined,
    userId: undefined,
    image: undefined
  }

  constructor(private http: HttpClient) { }

  login(authRequest: AuthResquest):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`,authRequest);
  }

  register(registerRequest: RegisterRequest):Observable<UserResponse>{
    return this.http.post<UserResponse>(`${this.baseUrl}/register`,registerRequest);
  }

  set user(user: any){
    this._user = user;
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  get user(){
    if (this._user.isAuth){
      return this._user;
    }else if (sessionStorage.getItem('user') != null){
      this._user = JSON.parse(sessionStorage.getItem('user') || '{}');
      return this._user;
    }
    return this._user;
  }

  set token(token: string){
    this._token = token;
    sessionStorage.setItem('token', token);
  }

  get token(){
    if (this._token){
      return this._token;
    }else if (sessionStorage.getItem('token') != null){
      this._token = sessionStorage.getItem('token') || '';
      return this._token;
    }
    return this._token!;
  }

  set refreshToken(refreshToken: string){
    this._refresh_token = refreshToken;
    sessionStorage.setItem('refreshToken', refreshToken);
  }

  get refreshToken(){
    if (this._refresh_token){
      return this._refresh_token;
    }else if (sessionStorage.getItem('refreshToken') != null){
      this._refresh_token = sessionStorage.getItem('refreshToken') || '';
      return this._refresh_token;
    }
    return this._refresh_token!;
  }

  getPayload(token:string){
    if (token != null){
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload;
    }
    return null;
  }

  isAdmin(){
    return this.user.isAdmin;
  }

  isAuth(){
    return this.user.isAuth;
  }

  logOut(){
    this._token = undefined;
    this._refresh_token = undefined;
    this._user = {
      isAuth: false,
      username: undefined,
      role: undefined,
      image: undefined
    };
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('image');
  }
}
