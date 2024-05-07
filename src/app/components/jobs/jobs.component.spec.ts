import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsComponent } from './jobs.component';
import { ApiService } from '../../service/api.service';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { HarnessLoader } from '@angular/cdk/testing';
import { Item } from '../../model/Item';
import { MatCardHarness } from '@angular/material/card/testing';
import { MatAccordionHarness } from '@angular/material/expansion/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

describe('JobsComponent', () => {
  let component: JobsComponent;
  let fixture: ComponentFixture<JobsComponent>;
  let apiServiceStub: Partial<ApiService>
  let loader: HarnessLoader;


  beforeEach(async () => {
    apiServiceStub = {
      loadInfoJobs() {
          return of([{
            '0': 222222
          }])
      },
      loadItemJobs(item) {
          return of({
            title: 'jobs title',
            time: 2222,
            url :' jobs url'
          },{
            title: 'jobs title',
            time: 2222,
            url :' jobs url'
          })
      },
    }
    await TestBed.configureTestingModule({
      declarations: [JobsComponent],
      providers: [{provide: ApiService, useValue: apiServiceStub}],
      imports: [AngularMaterialModule, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobsComponent);
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
      const infoObservable = apiServiceStub.loadInfoJobs().pipe(
        map((data: {}) => Object.values(data).slice(0, component.numberToLoad))
      );
      const itemObservables = infoObservable.pipe(
        switchMap((itemNumbers: number[]) => {
          const itemRequests = itemNumbers.map(itemNumber => apiServiceStub.loadItemJobs(itemNumber));
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
      expect(await cards.getTitleText()).toEqual('jobs title')
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
      expect(await expansPanel[0].getTextContent()).toBe('Score of the jobs: Type of the jobs:')
    })

  })
});
