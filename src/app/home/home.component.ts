import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Movie } from '../movie/movie';
import { MovieService } from '../movie/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  p: number = 1;
  movies: Movie[];
  loggedIn: boolean;
  dataReady: boolean = false;

  constructor(
    private movieService: MovieService, 
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data) => this.loggedIn = data)
    this.loggedIn = this.authService.isLoggedIn();

    if(this.loggedIn)
      this.initiatePopularMovies();
  }

  initiatePopularMovies() {
    this.movieService.getPopularMovies(1).subscribe((data: any) => {
      this.movies = data.results;
      this.dataReady = true;
    })
  }
}
