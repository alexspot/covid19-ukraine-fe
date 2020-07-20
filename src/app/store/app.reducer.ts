import * as fromCity from "../city/store/city.reducer";
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  city: fromCity.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  city: fromCity.cityReducer
}