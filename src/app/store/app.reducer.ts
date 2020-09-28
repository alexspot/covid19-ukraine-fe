import * as fromCity        from '../city/store/city.reducer';
import * as fromCountry     from '../country/store/country.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  city:    fromCity.State;
  country: fromCountry.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  city:    fromCity.cityReducer,
  country: fromCountry.countryReducer
}