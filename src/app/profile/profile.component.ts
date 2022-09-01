import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FavoriteService } from '../movie/favorite.service';
import { Movie } from '../movie/movie';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user;
  favorites: Movie[];
  dataReady: boolean = false;


  constructor(private favoriteService: FavoriteService, private authService: AuthService) { }

  ngOnInit(): void {
    this.initializeProfile();
    this.initializeFavoriteMovies();
  }

  initializeFavoriteMovies() {
    this.favoriteService.getFavoriteMovies().subscribe(
      (data: any) => {
        this.favorites = data;
        this.dataReady = true;
      }
    );
  }

  initializeProfile() {
    this.user = this.authService.getLoggedInUsername();
  }

}
