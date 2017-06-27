import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../environments/environment.prod';

@Injectable()
export class ApiService {
  constructor(private http: Http) { }

  getAtricles() {
    const url = `https://api.nytimes.com/svc/mostpopular/v2/mostviewed/World/30.json?apikey=${environment.APIKEY}`;
    return this.http.get(url);
  }

}
