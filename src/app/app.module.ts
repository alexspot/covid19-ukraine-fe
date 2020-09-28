import { BrowserModule }           from '@angular/platform-browser';
import { NgModule }                from '@angular/core';
import { StoreModule }             from '@ngrx/store'
import { HttpClientModule }        from '@angular/common/http';
import { FormsModule }             from '@angular/forms';
       
import { AppComponent }            from './app.component';
       
import * as fromApp                from './store/app.reducer';

import { NgxChartsModule }         from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule }        from './app-routing.module';
import { CityComponent }           from './city/city.component';

import { EffectsModule }           from '@ngrx/effects';
import { CityEffects }             from "./city/store/city.effects";
import { HeaderComponent }         from './header/header.component';
import { DashboardComponent }      from './dashboard/dashboard.component';

import { InputNumberModule }         from 'primeng/inputnumber';
import { InputSwitchModule }         from 'primeng/inputswitch';
import { ChartModule }             from 'primeng/chart';
import { CardModule }              from 'primeng/card';
import { CountryComponent }        from './country/country.component';
import { CountryEffects }          from './country/store/country.effects';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    CityComponent,
    HeaderComponent,
    DashboardComponent,
    CountryComponent,
    LeftSidebarComponent
  ],
  imports: [
    BrowserModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InputSwitchModule,
    InputNumberModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([CityEffects, CountryEffects]),
    HttpClientModule,
    FormsModule,
    ChartModule,
    CardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
