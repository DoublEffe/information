import { Component } from '@angular/core';
import { Item } from '../../model/Item';
import { ApiService } from '../../service/api.service';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { CommonComponent } from '../common/common.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent extends CommonComponent{
  
  constructor(private apiService: ApiService) {
    super()
  }
  
  override getInfoObservable(): Observable<any> {
    return this.apiService.loadInfoJobs().pipe(
      map((data: {}) => Object.values(data).slice(0, this.numberToLoad))
    )
  }

  override getItemObservable(item: number): Observable<any> {
    return this.apiService.loadItemJobs(item)
      
  }

}
