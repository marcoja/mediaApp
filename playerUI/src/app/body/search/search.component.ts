import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchService],
})
export class SearchComponent implements OnInit {
  trackName: string;
  searchTerm: string;
  songsList: any;
  test: any;
  constructor(private SearchService: SearchService) { }

  ngOnInit() {
    this.test = screen.width;
  }

  onResize(event) {
     console.log(event.target.innerWidth); // window width
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
