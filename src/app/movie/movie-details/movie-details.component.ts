import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  id: number;
  movie: Movie;
  dataReady: boolean = false;
  loggedIn: boolean;
  poster_base_url: string = 'http://image.tmdb.org/t/p/w154';
  backdrop_path_base_url: string = 'http://image.tmdb.org/t/p/original';

  private sub: any;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadMovieId();
    this.loadMovieData();

    this.loggedIn = this.authService.isLoggedIn();
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

  loadMovieId() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }

  loadMovieData() {
    this.movieService.getMovieById(this.id).subscribe((data: any) => {
      this.movie = data;
      this.dataReady = true;

      console.log(this.movie);
    });
  }

  addMovieToWatchlist() {

  }

  addMovieAsFavorite() {

  }

  markMovieAsWatched() {
    
  }

}
