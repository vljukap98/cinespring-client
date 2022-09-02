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

  getWatchedMovieIds() {
    return this.http.get(
      this.resourceUrl + '/ids/' + this.authService.getLoggedInUsername(),
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    );
  }

  addMovieToWatched(movieId: number) {
    return this.http.post(
      this.resourceUrl + '/add',
      {
        movieId: movieId,
        username: this.authService.getLoggedInUsername()
      },
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    );
  }

  removeMovieFromWatched(movieId: number) {
    return this.http.post(
      this.resourceUrl + '/remove',
      {
        movieId: movieId,
        username: this.authService.getLoggedInUsername()
      },
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    );
  }

  getMovieScore(movieId: number) {
    return this.http.get(
      this.resourceUrl + '/stars/' + movieId + '/' + this.authService.getLoggedInUsername(),
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    )
  }

  modifyMovieScore(movieId: number, movieScore: number) {
    return this.http.put(
      this.resourceUrl + '/modify-stars',
      {
        movieId: movieId,
        username: this.authService.getLoggedInUsername(),
        stars: movieScore
      },
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    );
  }
}
