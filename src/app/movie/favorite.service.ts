import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  resourceUrl: string = "http://localhost:8080/favorites";

  constructor(private http: HttpClient, private authService: AuthService) { }

  getFavoriteMovies() {
    return this.http.get(
      this.resourceUrl + '/' + this.authService.getLoggedInUsername(),
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    );
  }

  getFavoriteMovieIds() {
    return this.http.get(
      this.resourceUrl + '/ids/' + this.authService.getLoggedInUsername(),
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    );
  }

  addMovieAsFavorite(movieId: number) {
    return this.http.post(
      this.resourceUrl + '/add',
      {
        movieId: movieId,
        username: this.authService.getLoggedInUsername()
      },
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    );
  }

  removeMovieFromFavorite(movieId: number) {
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
