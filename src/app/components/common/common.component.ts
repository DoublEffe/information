import { Component } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Item } from '../../model/Item';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrl: './common.component.css'
})
export class CommonComponent {
  numberToLoad = 10;
  itemNumbers: unknown[] = []
  cardsNews: Item[] = []
  panelOpenState = {}
  componentCheck: string

  constructor() {}

  ngOnInit(): void {
    const infoObservable = this.getInfoObservable()
  
    const itemObservables = infoObservable.pipe(
      switchMap((itemNumbers: number[]) => {
        const itemRequests = itemNumbers.map(itemNumber => this.getItemObservable(itemNumber));
        return forkJoin(itemRequests);
      })
    );
    itemObservables.subscribe((cardsNews: Item[]) => {
      this.cardsNews = cardsNews;
      this.panelOpenState = new Array(cardsNews.length).fill(false);
    });
  }

  getInfoObservable(): Observable<any> {
    throw new Error('Method not implemented.');
  }

  getItemObservable(itemNumber: number): any {
    throw new Error('Method not implemented.');
  }

  onLoad() {
    this.numberToLoad += 10
    this.ngOnInit() 
  }

}
