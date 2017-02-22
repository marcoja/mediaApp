import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SaveSongService {

  constructor(private http: Http, private Headers: Headers) { }

  saveNewSong(song: Object): Promise <any> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    });
    const body = JSON.stringify(song);
    const url  = 'http://localhost:3000/api/Songs';
    // return this.http.post(url, body, headers).map(response => response.json()).toPromise();
    return this.http.post(url, body, headers).toPromise();
  }

}
