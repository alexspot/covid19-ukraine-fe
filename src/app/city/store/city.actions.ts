import { Action } from '@ngrx/store'

import { City } from '../city.model';

export const GET_CITIES                = '[City] Get Cities'
export const SET_CITIES                = '[City] Set Cities'
export const GET_MAX_DATE              = '[City] Get Max Date'
export const SET_MAX_DATE              = '[City] Set Max Date'
export const GET_DAILY_GROWTH          = '[City] Get Daily Growth'
export const GET_DAILY_GROWTH_BY_MONTH = '[City] Get Daily Growth By Month'
export const GET_DAILY_GROWTH_BY_DAY   = '[City] Get Daily Growth By Date'

export class getCities implements Action {
  readonly type = GET_CITIES

  constructor(public date: String) {}
}

export class setCities implements Action {
  readonly type = SET_CITIES

  constructor(public payload: City[]) {}
}

export class getMaxDate implements Action {
  readonly type = GET_MAX_DATE
}

export class setMaxDate implements Action {
  readonly type = SET_MAX_DATE

  constructor(public payload: String) {}
}

export class getDailyGrowth implements Action {
  readonly type = GET_DAILY_GROWTH
}

export class getDailyGrowthByMonth implements Action {
  readonly type = GET_DAILY_GROWTH_BY_MONTH

  constructor(public payload: String) {}
}

export class getDailyStatsByDate implements Action {
  readonly type = GET_DAILY_GROWTH_BY_DAY

  constructor(public payload: String) {}
}

export type CityActions = 
  | getCities
  | setCities
  | getMaxDate
  | setMaxDate
  | getDailyGrowthByMonth
  | getDailyStatsByDate
