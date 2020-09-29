import * as CountryActions         from './country.actions';
import * as fromApp                from '../../store/app.reducer';
import { Country }                 from '../country.model'

import { Injectable }              from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Router }                  from '@angular/router';
import { HttpClient }              from '@angular/common/http';
import { Store }                   from '@ngrx/store';
import { switchMap, map }          from 'rxjs/operators';


@Injectable()
export class CountryEffects {

  @Effect()
  getCountriesByDate = this.actions$.pipe(
    ofType(CountryActions.GET_COUNTRY),
    switchMap((action: CountryActions.getCountry) => {
      return this.http.get<Country>(
        'http://localhost:3600/countries/ukraine/month/total/' + action.payload
      );
    }),
    map(country => {  
      return { ...country }
    }),
    map(country => {
      return new CountryActions.setCountries([country]);
    })
  );

  @Effect()
  getAllCountries = this.actions$.pipe(
    ofType(CountryActions.GET_COUNTRIES),
    switchMap((action: CountryActions.getCountries) => {
      return this.http.get<Country[]>(
        'http://localhost:3600/countries/ukraine/'
      );
    }),
    map(countries => {
      return countries.map(country => {
        return { ...country }
      })
    }),
    map(countries => {
      return new CountryActions.setCountries(countries);
    })
  );


  @Effect()
  getCountriesDailyStats = this.actions$.pipe(
    ofType(CountryActions.GET_COUNTRIES_DAILY),
    switchMap((action: CountryActions.getCountriesDaily) => {
      return this.http.get<Country[]>(
        'http://localhost:3600/countries/ukraine/alltime/daily'
      );
    }),
    map(countries => {
      return countries.map(country => {
        return { ...country }
      })
    }),
    map(countries => {
      return new CountryActions.setCountries(countries);
    })
  );

  @Effect()
  getCountriesDailyGrowth = this.actions$.pipe(
    ofType(CountryActions.GET_COUNTRIES_DAILY_GROWTH),
    switchMap((action: CountryActions.getCountryDailyGrowth) => {
      return this.http.get<Country[]>(
        'http://localhost:3600/countries/ukraine/growth/daily'
      );
    }),
    map(countries => {
      return countries.map(country => {
        return { ...country }
      })
    }),
    map(countries => {
      return new CountryActions.setCountries(countries);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
}