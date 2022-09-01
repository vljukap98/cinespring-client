import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  resourceUrl: string = "http://localhost:8080/movie";

  constructor(private http: HttpClient, private authService: AuthService) { }

  getMovieById(id: number) {
    return this.http.get(
      this.resourceUrl + "/" + id,
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    )
  }

  getPopularMovies(page: number) {
    return this.http.get(
      this.resourceUrl + '/popular/' + page,
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    )
  }

  getRandomMovie() {
    return this.http.get(
      this.resourceUrl + '/random',
      // {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    )
  }
}
