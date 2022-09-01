import { Component, OnInit } from '@angular/core';
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
  poster_base_url: string = 'http://image.tmdb.org/t/p/w154';
  backdrop_path_base_url: string = 'http://image.tmdb.org/t/p/w500';

  constructor(private movieService: MovieService) { }

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

}
