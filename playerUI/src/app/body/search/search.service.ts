import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class SearchService {

  constructor(private http: Http) { }


  searchAPI(searchTerm: string): Promise <any> {
    const baseUrl = 'http://localhost:3000/api/Songs/search';
    const toSearch = '?name=' + searchTerm;
    const final = baseUrl + toSearch;
    return this.http.get(final).map(response => response.json()).toPromise();
  }// searchAPI

}// SearchService
