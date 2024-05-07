import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './components/home/home.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { CommonComponent } from './components/common/common.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CommonComponent,
    SearchComponent,
    JobsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient( withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
