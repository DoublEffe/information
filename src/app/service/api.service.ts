import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string = 'https://hacker-news.firebaseio.com/v0/'
  constructor(private http: HttpClient) { }

  loadInfo() {
    return this.http.get(this.baseUrl + 'newstories.json?print=pretty')
  }

  loadItem(item: number) {
    return this.http.get(this.baseUrl + `item/${String(item)}.json`)
  }
}
