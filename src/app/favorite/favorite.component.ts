import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../movie/favorite.service';
import { Movie } from '../movie/movie';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  p: number = 1;
  favorites: Movie[];
  dataReady: boolean = true;
  listFull: boolean = false;

  constructor(private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.initializeFavoriteMovies();
  }

  initializeFavoriteMovies() {
    this.favoriteService.getFavoriteMovies().subscribe(
      (data: any) => {
        this.favorites = data;
        this.dataReady = true;

        if(this.favorites.length > 0)
          this.listFull = true;
        else 
          this.listFull = false;
      });
  }
}
