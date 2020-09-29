import * as CityActions                from './city.actions';
import * as fromApp                    from '../../store/app.reducer';
import { City }                        from '../city.model';

import { Injectable }                  from '@angular/core';
import { Actions, ofType, Effect }     from '@ngrx/effects';
import { switchMap, map }              from 'rxjs/operators';
import { Store }                       from '@ngrx/store';
import { HttpClient }                  from '@angular/common/http';
import { Router }                      from '@angular/router';


@Injectable()
export class CityEffects {

  @Effect()
  getCities = this.actions$.pipe(
    ofType(CityActions.GET_CITIES),
    switchMap((action: CityActions.getCities) => {
      return this.http.get<City[]>(
        'http://localhost:3600/cities/date/' + action.date
      );
    }),
    map(cities => {
      return cities.map(city => {
        return { ...city }
      })
    }),
    map(cities => {
      return new CityActions.setCities(cities);
    })
  );

  @Effect()
  getMaxDate = this.actions$.pipe(
    ofType(CityActions.GET_MAX_DATE),
    switchMap(() => {
      return this.http.get<String>(
        'http://localhost:3600/cities/date/get/maxdate'
      )
    }),
    map(date => {
      return new CityActions.setMaxDate(date);
    })
  );

  @Effect()
  getDailyGrowthByCities = this.actions$.pipe(
    ofType(CityActions.GET_DAILY_GROWTH),
    switchMap(() => {
      return this.http.get<City[]>(
        'http://localhost:3600/cities/alltime/daily'
      )
    }),
    map(cities => {
      return cities.map(city => {
        return { ...city }
      })
    }),
    map(cities => {
      return new CityActions.setCities(cities);
    })
  )

  @Effect()
  getDailyGrowthByCitiesByMonth = this.actions$.pipe(
    ofType(CityActions.GET_DAILY_GROWTH_BY_MONTH),
    switchMap((action: CityActions.getDailyGrowthByMonth) => {
      return this.http.get<City[]>(
        'http://localhost:3600/cities/ukraine/month/' + action.payload
      )
    }),
    map(cities => {
      return cities.map(city => {
        return { ...city }
      })
    }),
    map(cities => {
      return new CityActions.setCities(cities);
    })
  )

  @Effect()
  getDailyGrowthByCitiesByDay = this.actions$.pipe(
    ofType(CityActions.GET_DAILY_GROWTH_BY_DAY),
    switchMap((action: CityActions.getDailyStatsByDate) => {
      return this.http.get<City[]>(
        'http://localhost:3600/cities/ukraine/day/' + action.payload
      )
    }),
    map(cities => {
      return cities.map(city => {
        return { ...city }
      })
    }),
    map(cities => {
      return new CityActions.setCities(cities);
    })
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
}