import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class WatchedService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getWatchedMovies(){
    return this.http.get(
      environment.watchedApiUrl + '/' + this.authService.getLoggedInUsername(),
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    )
  }

  getWatchedMovieIds() {
    return this.http.get(
      environment.watchedApiUrl + '/ids/' + this.authService.getLoggedInUsername(),
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    );
  }

  addMovieToWatched(movieId: number) {
    return this.http.post(
      environment.watchedApiUrl + '/add',
      {
        movieId: movieId,
        username: this.authService.getLoggedInUsername()
      },
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    );
  }

  removeMovieFromWatched(movieId: number) {
    return this.http.post(
      environment.watchedApiUrl + '/remove',
      {
        movieId: movieId,
        username: this.authService.getLoggedInUsername()
      },
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    );
  }

  getMovieScore(movieId: number) {
    return this.http.get(
      environment.watchedApiUrl + '/stars/' + movieId + '/' + this.authService.getLoggedInUsername(),
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    )
  }

  modifyMovieScore(movieId: number, movieScore: number) {
    return this.http.put(
      environment.watchedApiUrl + '/modify-stars',
      {
        movieId: movieId,
        username: this.authService.getLoggedInUsername(),
        stars: movieScore
      },
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    );
  }
}
