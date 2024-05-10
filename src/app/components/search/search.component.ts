import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Item } from '../../model/Item';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { CommonComponent } from '../common/common.component';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent extends CommonComponent{


  constructor(private apiService: ApiService) {
    super()
  }

  override getInfoObservable(): Observable<any> {
      return this.apiService.loadInfoNews().pipe(
        map((data: {}) => Object.values(data).slice(0, this.numberToLoad))
      )
  }

  override getItemObservable(item: number): Observable<any> {
      return this.apiService.loadItemNews(item)
  }
}
