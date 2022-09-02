import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  hovered: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });
  }

  search() {
    const searchQuery = this.searchForm.get('search').value;
    this.router.navigate(['/search-result', searchQuery]);
  }

  mouseEnter() {
    this.hovered = true;
  }

  mouseLeave() {
    this.hovered = false;
  }

}
