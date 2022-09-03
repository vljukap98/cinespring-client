import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie/movie';
import { WatchedService } from './watched.service';

@Component({
  selector: 'app-watched',
  templateUrl: './watched.component.html',
  styleUrls: ['./watched.component.css']
})
export class WatchedComponent implements OnInit {

  p: number = 1;
  watchedMovies: Movie[];
  dataReady: boolean;
  listFull: boolean = false;

  constructor(private watchedService: WatchedService) { }

  ngOnInit(): void {
    this.initializeWatchedMovies();
  }

  initializeWatchedMovies() {
    this.watchedService.getWatchedMovies().subscribe((data: any) => {
      this.watchedMovies = data;
      this.dataReady = true;

      if(this.watchedMovies.length > 0)
        this.listFull = true;
      else 
        this.listFull = false;
    }, (error) => {
      this.listFull = false;
    });
  }
}
