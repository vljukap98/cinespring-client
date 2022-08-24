import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.httpClient.post('http://localhost:8080/auth/authenticate',
      {
        username: username,
        password: password
      }
    ).pipe(map((data: any) =>{
      localStorage.setItem('jwt', data.jwt);
      localStorage.setItem('username', data.username);

      this.loggedIn.emit(true);

      return true;
    }));
  }

  getToken() {
    return localStorage.getItem('jwt');
  }

  isLoggedIn() {
    return this.getToken() != null;
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
  }
}
