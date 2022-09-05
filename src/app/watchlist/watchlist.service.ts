import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getWatchlist() {
    return this.http.get(
      environment.watchlistApiUrl + '/' + this.authService.getLoggedInUsername(),
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    );
  }

  getWatchlistMovieIds() {
    return this.http.get(
      environment.watchlistApiUrl + '/ids/' + this.authService.getLoggedInUsername(),
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    );
  }

  addMovieToWatchlist(movieId: number) {
    return this.http.post(
      environment.watchlistApiUrl + '/add',
      {
        movieId: movieId,
        username: this.authService.getLoggedInUsername()
      },
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    );
  }

  removeMovieFromWatchlist(movieId: number) {
    return this.http.post(
      environment.watchlistApiUrl + '/remove',
      {
        movieId: movieId,
        username: this.authService.getLoggedInUsername()
      },
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    );
  }
}
