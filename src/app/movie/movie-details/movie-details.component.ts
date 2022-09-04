import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { WatchedService } from 'src/app/watched/watched.service';
import { WatchlistService } from 'src/app/watchlist/watchlist.service';
import { FavoriteService } from '../favorite.service';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { MatSliderModule} from '@angular/material/slider'; 

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

  id: number;
  movie: Movie;
  loggedIn: boolean;
  movieScore: number = 0;
  dataReady: boolean = false;

  genres: [];
  watchedMovies: number[];
  favoriteMovies: number[];
  watchlistMovies: number[];

  isMovieWatched: boolean = false;
  isMovieFavorite: boolean = false;
  isMovieWatchlisted: boolean = false;

  poster_base_url: string = 'http://image.tmdb.org/t/p/w154';
  backdrop_path_base_url: string = 'http://image.tmdb.org/t/p/original';

  private sub: any;

  constructor(
    private route: ActivatedRoute, 
    private movieService: MovieService, 
    private authService: AuthService,
    private watchedService: WatchedService,
    private favoriteService: FavoriteService,
    private watchlistService: WatchlistService,
    ) { }

  ngOnInit(): void {
    this.loadMovieId();
    this.loadMovieData();
    this.initializeUserMovies();
    this.initializeCrewCast();

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
    });
    this.watchedService.getMovieScore(this.id).subscribe(
      (data: number) => {
        this.movieScore = data;
      }
    );
  }

  initializeCrewCast() {
    this.movieService.getMovieGenres(this.id).subscribe(
      (data: any) => {
        this.genres = data;
        console.log(this.genres);
      }
    );
  }

  initializeUserMovies() {
    this.initializeWatchedMovies();
    this.initializeWatchlistMovies();
    this.initializeFavoriteMovies();
  }

  initializeWatchedMovies() {
    this.watchedService.getWatchedMovieIds().subscribe((data: []) => {
      this.watchedMovies = data;

      if(this.watchedMovies.indexOf(this.id) !== -1) {
        this.isMovieWatched = true;
      }
    });
  }

  initializeWatchlistMovies() {
    this.watchlistService.getWatchlistMovieIds().subscribe((data: []) => {
      this.watchlistMovies = data;

      if(this.watchlistMovies.indexOf(this.id) !== -1) {
        this.isMovieWatchlisted = true;
      }
    });
  }

  initializeFavoriteMovies() {
    this.favoriteService.getFavoriteMovieIds().subscribe((data: []) => {
      this.favoriteMovies = data;

      if(this.favoriteMovies.indexOf(this.id) !== -1) {
        this.isMovieFavorite = true;
      }
    });
  }

  addMovieToWatchlist() {
    if(this.isMovieWatchlisted) {
      this.watchlistService.removeMovieFromWatchlist(this.id).subscribe(
        () => {
          this.watchlistMovies.splice(this.id);
          this.isMovieWatchlisted = false;
        }, 
        (error) => {
          return;
        }
      );
    } else {
      if(this.isMovieWatched) {
        alert("Cannot watchlist movies already marked as watched")
      } else {
        this.watchlistService.addMovieToWatchlist(this.id).subscribe(
          () => {
            this.watchlistMovies.push(this.id);
            this.isMovieWatchlisted = true;
          },
          (error) => {
            return;
          }
        );
      }
    }

  }

  addMovieAsFavorite() {
    if(this.isMovieFavorite) {
      this.favoriteService.removeMovieFromFavorite(this.id).subscribe(
        () => {
          this.favoriteMovies.splice(this.id);
          this.isMovieFavorite = false;
        },
        (error) => {
          return;
        }
      );
    } else {
      if(this.isMovieWatchlisted) {
        this.watchlistService.removeMovieFromWatchlist(this.id).subscribe(
          () => {
            this.watchlistMovies.splice(this.id);
            this.isMovieWatchlisted = false;
          }, 
          (error) => {
            return;
          }
        );
      }
      if(!this.isMovieWatched) {
        this.watchedService.addMovieToWatched(this.id).subscribe(
          () => {
            this.watchedMovies.push(this.id);
            this.isMovieWatched = true;
          },
          (error) => {
            return
          }
        );
      }

      this.favoriteService.addMovieAsFavorite(this.id).subscribe(
        () => {
          this.favoriteMovies.push(this.id);
          this.isMovieFavorite = true;
        },
        (error) => {
          return
        }
      );
    }
  }

  markMovieAsWatched() {
    if(this.isMovieWatched){
      if(this.isMovieFavorite) {
        this.favoriteService.removeMovieFromFavorite(this.id).subscribe(() => {
          this.favoriteMovies.splice(this.id);
          this.isMovieFavorite = false;
        }, (error) => {
          return;
        });
      }
      this.watchedService.removeMovieFromWatched(this.id).subscribe(
        () => {
          this.watchedMovies.splice(this.id);
          this.isMovieWatched = false;
          this.movieScore = 0;
        },
        (error) => {
          return;
        }
      );
    } else {
      if(this.isMovieWatchlisted) {
        this.watchlistService.removeMovieFromWatchlist(this.id).subscribe(
          () => {
            this.watchlistMovies.splice(this.id);
            this.isMovieWatchlisted = false;
          }, 
          (error) => {
            return;
          }
        );
      }

      this.watchedService.addMovieToWatched(this.id).subscribe(
        () => {
          this.watchedMovies.push(this.id);
          this.isMovieWatched = true;
        },
        (error) => {
          return
        }
      );
    }
  }

  updateScore(event) {
    this.watchedService.modifyMovieScore(this.id, event.value).subscribe(
      () => {
        this.movieScore = event.value;
      } 
    );
  }

}
