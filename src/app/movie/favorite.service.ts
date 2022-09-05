import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getFavoriteMovies() {
    return this.http.get(
      environment.favoriteApiUrl + '/' + this.authService.getLoggedInUsername(),
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    );
  }

  getFavoriteMovieIds() {
    return this.http.get(
      environment.favoriteApiUrl + '/ids/' + this.authService.getLoggedInUsername(),
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    );
  }

  addMovieAsFavorite(movieId: number) {
    return this.http.post(
      environment.favoriteApiUrl + '/add',
      {
        movieId: movieId,
        username: this.authService.getLoggedInUsername()
      },
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    );
  }

  removeMovieFromFavorite(movieId: number) {
    return this.http.post(
      environment.favoriteApiUrl + '/remove',
      {
        movieId: movieId,
        username: this.authService.getLoggedInUsername()
      },
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    );
  }
}
