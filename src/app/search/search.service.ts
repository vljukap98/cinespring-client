import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  resourceUrl: string = "http://localhost:8080/search";

  constructor(private http: HttpClient, private authService: AuthService) { }

  search(searchQuery: string, page: number) {
    return this.http.get(
      this.resourceUrl + '/' + searchQuery + '/' + page,
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    )
  }
}
