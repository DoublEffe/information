import { Component } from '@angular/core';
import { Item } from '../../model/Item';
import { ApiService } from '../../service/api.service';
import { forkJoin, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent {
  numberToLoad = 10;
  itemNumbers: unknown[] = []
  cardsNews: Item[] = []
  panelOpenState = {}
  

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    const infoObservable = this.apiService.loadInfoJobs().pipe(
      map((data: {}) => Object.values(data).slice(0, this.numberToLoad))
    );
  
    const itemObservables = infoObservable.pipe(
      switchMap((itemNumbers: number[]) => {
        const itemRequests = itemNumbers.map(itemNumber => this.apiService.loadItemJobs(itemNumber));
        return forkJoin(itemRequests);
      })
    );
  
   
    itemObservables.subscribe((cardsNews: Item[]) => {
      this.cardsNews = cardsNews;
      this.panelOpenState = new Array(cardsNews.length).fill(false);
    });
    
  }

  onLoad() {
    this.numberToLoad += 10
    this.ngOnInit() 
  }

}
