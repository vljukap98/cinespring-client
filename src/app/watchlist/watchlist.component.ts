import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie/movie';
import { WatchlistService } from './watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  p: number = 1;
  watchlistMovies: Movie[];
  dataReady: boolean = true;
  listFull: boolean = false;

  constructor(private watchlistService: WatchlistService) { }

  ngOnInit(): void {
    this.initializeWatchlist();
  }

  initializeWatchlist() {
    this.watchlistService.getWatchlist().subscribe((data: any) => {
      this.watchlistMovies = data;
      this.dataReady = true;

      if(this.watchlistMovies.length > 0)
        this.listFull = true;
      else 
        this.listFull = false;
    });
  }

}
