import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post('http://localhost:8080/auth/authenticate',
      {
        username: username,
        password: password
      }
    ).pipe(map((data: any) =>{
      localStorage.setItem('jwt', data.jwt);
      localStorage.setItem('username', data.username);
      localStorage.setItem('tokenExpires', data.expires)

      console.log(data);

      this.loggedIn.emit(true);

      return true;
    }));
  }

  signup(email: string, username: string, password: string) {
    return this.http.post(
      'http://localhost:8080/auth/register',
      {
        username: username,
        password: password,
        email: email
      }
    );
  }

  getLoggedInUsername() {
    return localStorage.getItem('username');
  }

  getToken() {
    return localStorage.getItem('jwt');
  }

  getExpires(): number {
    return +localStorage.getItem('tokenExpires');
  }

  isLoggedIn() {
    return this.getToken() != null;
  }

  logout() {
    this.loggedIn.emit(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
  }
}
