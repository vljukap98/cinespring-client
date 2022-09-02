import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  resourceUrl: string = 'http://localhost:8080/watchlist';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getWatchlist() {
    return this.http.get(
      this.resourceUrl + '/' + this.authService.getLoggedInUsername(),
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    );
  }

  getWatchlistMovieIds() {
    return this.http.get(
      this.resourceUrl + '/ids/' + this.authService.getLoggedInUsername(),
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    );
  }

  addMovieToWatchlist(movieId: number) {
    return this.http.post(
      this.resourceUrl + '/add',
      {
        movieId: movieId,
        username: this.authService.getLoggedInUsername()
      },
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    );
  }

  removeMovieFromWatchlist(movieId: number) {
    return this.http.post(
      this.resourceUrl + '/remove',
      {
        movieId: movieId,
        username: this.authService.getLoggedInUsername()
      },
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    );
  }
}
