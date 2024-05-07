import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string = 'https://hacker-news.firebaseio.com/v0/'
  constructor(private http: HttpClient) { }

  loadInfoNews() {
    return this.http.get(this.baseUrl + 'newstories.json?print=pretty')
  }

  loadItemNews(item: number) {
    return this.http.get(this.baseUrl + `item/${String(item)}.json`)
  }

  loadInfoJobs() {
    return this.http.get(this.baseUrl + 'jobstories.json?print=pretty')
  }

  loadItemJobs(item: number) {
    return this.http.get(this.baseUrl + `item/${String(item)}.json`)
  }
}
