import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WatchedService {

  resourceUrl: string = 'http://localhost:8080/watched';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getWatchedMovies(){
    return this.http.get(
      this.resourceUrl + '/' + this.authService.getLoggedInUsername(),
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    )
  }
}
