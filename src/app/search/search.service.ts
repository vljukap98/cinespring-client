import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  search(searchQuery: string, page: number) {
    return this.http.get(
      environment.searchApiUrl + '/' + searchQuery + '/' + page,
      {headers: {'Authorization': 'Bearer ' + this.authService.getToken()}}
    )
  }
}
