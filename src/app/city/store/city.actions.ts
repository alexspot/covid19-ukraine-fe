import { Action } from '@ngrx/store'

// import { City } from '../city.model';

export const GET_CITIES = '[City] Get Cities'

export class getCities implements Action {
  readonly type = GET_CITIES
}



export type CityActions = 
  | getCities
