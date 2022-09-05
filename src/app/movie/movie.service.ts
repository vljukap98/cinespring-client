import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getMovieById(id: number) {
    return this.http.get(
      environment.movieApiUrl + "/" + id,
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    )
  }

  getPopularMovies(page: number) {
    return this.http.get(
      environment.movieApiUrl + '/popular/' + page,
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    )
  }

  getRandomMovie() {
    return this.http.get(
      environment.movieApiUrl + '/random',
    )
  }

  getMovieGenres(id: number) {
    return this.http.get(
      environment.movieApiUrl + '/genre/' + id,
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    )
  }
}
