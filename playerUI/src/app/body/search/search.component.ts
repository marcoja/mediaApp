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
  term: string;
  songsList: any;
  test: any;
  imageSize: number;
  smallScreen: boolean;
  resultsFlag: boolean;
  showSpinner: boolean;
  constructor(private SearchService: SearchService) { }

  ngOnInit() {
    // console.log('debugging:');
    // console.log(window.innerWidth);
    this.resultsFlag = false;
    this.showSpinner = false;
    this.setScreen(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setScreen(event.target.innerWidth);
  }

  setScreen(screenWidth): any {
      this.smallScreen = screenWidth < 768 ? true : false;
      this.imageSize = screenWidth < 768 ? 3 : 1;
  }

  getImage(song): any {
    return song.image[this.imageSize]['#text'];
  }
  search(searchTerm): void {
    this.showSpinner = true;
    this.term = searchTerm;
    this.searchTerm = searchTerm;
    console.log('search clicked! - %s', searchTerm);
    this.SearchService.searchAPI(this.searchTerm).then((results) => {
      this.songsList = results;
      this.showSpinner = false;
      this.resultsFlag = true;
    });
  }// search
}// searchComponent
