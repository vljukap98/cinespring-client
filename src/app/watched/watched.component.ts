import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie/movie';
import { WatchedService } from './watched.service';

@Component({
  selector: 'app-watched',
  templateUrl: './watched.component.html',
  styleUrls: ['./watched.component.css']
})
export class WatchedComponent implements OnInit {

  watchedMovies: Movie[];
  dataReady: boolean = false;

  constructor(private watchedService: WatchedService) { }

  ngOnInit(): void {
    this.initializeWatchedMovies();
  }

  initializeWatchedMovies() {
    this.watchedService.getWatchedMovies().subscribe((data: any) => {
      this.watchedMovies = data;
      this.dataReady = true;
    })
  }
}
