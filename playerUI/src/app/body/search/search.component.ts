import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {
  trackName: string;
  searchTerm: string;
  songsList: any;
  constructor(private SearchService: SearchService) { }

  ngOnInit() {
  }

  search(searchTerm): void {
    this.searchTerm = searchTerm;
    console.log('search clicked! - %s', searchTerm);
    this.SearchService.searchAPI(this.searchTerm).then((results) => {
      this.songsList = results;
      console.log( results );
    });
  }// search
}// searchComponent
