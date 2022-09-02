import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent implements OnInit {

  randomMovie: Movie;
  dataReady: boolean = false;
  dieHovered: boolean = false;
  poster_base_url: string = 'http://image.tmdb.org/t/p/w154';
  backdrop_path_base_url: string = 'http://image.tmdb.org/t/p/original';

  constructor(
    private movieService: MovieService, 
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getRandomMovie();
  }

  getRandomMovie(){
    this.movieService.getRandomMovie().subscribe((data: any) => {
      this.randomMovie = data;
      this.dataReady = true;
      if(data.genres == null) {
        this.getMovieGenres();
      }
    });
  }

  getMovieGenres() {
    
  }

  mouseEnter() {
    this.dieHovered = true;
  }

  mouseLeave() {
    this.dieHovered = false;
  }

  openMovieDetails() {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/movie-details', this.randomMovie.id]);
    }
  }
}
