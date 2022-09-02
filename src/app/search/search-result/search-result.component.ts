import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Search } from '../search';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {


  private sub: any;

  p: number = 1;
  searchResult: [];
  searchQuery: string;
  dataReady: boolean = false;

  poster_base_url: string = 'http://image.tmdb.org/t/p/w154';

  constructor(private activatedRoute: ActivatedRoute, private searchService: SearchService) { }

  ngOnInit(): void {
    this.loadSearchQueryFromParams();
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

  loadSearchQueryFromParams() {
    this.sub = this.activatedRoute.params.subscribe(
      (params) => {
        this.searchQuery = params.searchQuery;
        this.loadSearchResult();
      }
    );
  }

  loadSearchResult() {
    this.searchService.search(this.searchQuery, 1).subscribe((data: Search) => {
      this.searchResult = data.results;
      this.dataReady = true;
    }); 
  }

}
