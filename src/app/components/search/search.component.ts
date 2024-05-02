import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Item } from '../../model/Item';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  numberToLoad = 10;
  itemNumbers: number[] = []
  cardsNews: Item[] = []
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.loadInfo().subscribe((data: {}) => {
      for(let i = 0; i < this.numberToLoad; i++) {

        this.itemNumbers.push(data[String(i)])
      }
    })
    
    this.itemNumbers.forEach((itemNumber: number) => {
      this.apiService.loadItem(itemNumber).subscribe((data: Item) => {
        this.cardsNews.push(data)
      })
    })
  }

}
