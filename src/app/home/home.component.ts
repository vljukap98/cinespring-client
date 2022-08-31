import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie/movie';
import { MovieService } from '../movie/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movie1;
  movies: Movie[];
  dataReady: boolean = false;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.initiatePopularMovies();
  }

  initiatePopularMovies() {
    this.movieService.getPopularMovies(1).subscribe((data: any) => {
      this.movies = data.results;
      this.dataReady = true;
    },(error) => {
      if(error.error.message == undefined)
        alert("Server error")
    })
  }
}
