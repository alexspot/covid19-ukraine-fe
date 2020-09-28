import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CityComponent }        from './city/city.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { CountryComponent }     from './country/country.component';

const routes: Routes = [
  { path: 'dashboard',      component: CityComponent },
  { path: 'dash',           component: DashboardComponent},

  { path: 'days',           component: CountryComponent, data : {kind: 'days'}},
  { path: 'months',         component: CountryComponent, data : {kind: 'months'}},
  { path: 'daily-growth',   component: CountryComponent, data : {kind: 'daily-growth'}},

  { path: 'region-days',    component: CityComponent,    data:  {kind: 'days'}},
  { path: 'region-months',  component: CityComponent,    data:  {kind: 'months'}},
  { path: 'region-growth',  component: CityComponent,    data:  {kind: 'growth'}}
]


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
