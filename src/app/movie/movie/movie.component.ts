import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @Input() movie: Movie;

  poster_base_url: string = 'http://image.tmdb.org/t/p/w154';
  backdrop_path_base_url: string = 'http://image.tmdb.org/t/p/w500';
  

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openMovieDetails(id: number) {
    this.router.navigate(['/movie-details', id]);
  }

}
