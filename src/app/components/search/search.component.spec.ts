import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { ApiService } from '../../service/api.service';
import { forkJoin, lastValueFrom, map, of, switchMap } from 'rxjs';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardHarness} from '@angular/material/card/testing';
import {MatButtonHarness} from '@angular/material/button/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import { Item } from '../../model/Item';
import {MatAccordionHarness} from '@angular/material/expansion/testing';


describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let apiServiceStub: Partial<ApiService>
  let loader: HarnessLoader;

  beforeEach(async () => {
    apiServiceStub = {
      loadInfoNews() {
          return of([{
            '0': 222222
          }])
      },
      loadItemNews(item) {
          return of({
            title: 'news title',
            time: 2222,
            url :' news url'
          },{
            title: 'news title',
            time: 2222,
            url :' news url'
          }
        )
      },
    }
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [{provide: ApiService, useValue: apiServiceStub}],
      imports: [AngularMaterialModule, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('all elements should be visible', () => {
    beforeEach(() => {
      component.numberToLoad = 1
      const infoObservable = apiServiceStub.loadInfoNews().pipe(
        map((data: {}) => Object.values(data).slice(0, component.numberToLoad))
      );
      const itemObservables = infoObservable.pipe(
        switchMap((itemNumbers: number[]) => {
          const itemRequests = itemNumbers.map(itemNumber => apiServiceStub.loadItemNews(itemNumber));
          return forkJoin(itemRequests);
        })
      );
      itemObservables.subscribe((cardsNews: Item[]) => {
        component.cardsNews = cardsNews;
        component.panelOpenState = new Array(cardsNews.length).fill(false);
      });
    })
    it('cards should be visible', async() => {
      component.ngOnInit()
      fixture.detectChanges()
      fixture.whenStable()
      const cards = await loader.getHarness(MatCardHarness)
      expect(await cards.getTitleText()).toEqual('news title')
    })

    it('number of cards shold be 1', async () => {
      expect(component.cardsNews.length).toEqual(1)
    })

    it('details scetion should be visible', async () => {
      const expans = await loader.getHarness(MatAccordionHarness)
      const expansPanel = await expans.getExpansionPanels()
      expect(expansPanel).toBeDefined()
    })

    it('button shoulbe visible', async () => {
      const button = await loader.getHarness(MatButtonHarness)
      expect( await button.getText()).toBe('Load More')
    })
  })

  describe('logic of the compoenet', () => {

    it('should call onLoad method after click', async () => {
      const spy = spyOn(component, 'onLoad').and.callThrough();
      const button = await loader.getHarness(MatButtonHarness.with({text: 'Load More'}))
      await button.click()
      expect(spy).toHaveBeenCalled()
    })

    it('details should expand', async () => {
      const expans = await loader.getHarness(MatAccordionHarness)
      const expansPanel = await expans.getExpansionPanels()
      await expansPanel[0].expand()
      expect(await expansPanel[0].getTextContent()).toBe('Score of the news: Type of the news:')
    })

  })
});
