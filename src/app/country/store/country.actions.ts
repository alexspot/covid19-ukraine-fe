import { Action } from '@ngrx/store'

import { Country } from '../country.model';

export const GET_COUNTRY                = '[Country] Get Country by date'
export const GET_COUNTRIES              = '[Country] Get Countries'
export const SET_COUNTRIES              = '[Country] Set Countries'
export const GET_COUNTRIES_DAILY        = '[Country] Get Countries stats day by day'
export const GET_COUNTRIES_DAILY_GROWTH = '[Country] Get Country daily growth'

export class getCountry implements Action {
  readonly type = GET_COUNTRIES

  constructor(public payload: String) {}
}

export class getCountries implements Action {
  readonly type = GET_COUNTRIES
}

export class setCountries implements Action {
  readonly type = SET_COUNTRIES

  constructor(public payload: Country[]) {}
}

export class getCountriesDaily implements Action {
  readonly type = GET_COUNTRIES_DAILY
}

export class getCountryDailyGrowth implements Action {
  readonly type = GET_COUNTRIES_DAILY_GROWTH
}

export type CountryActions = 
  | getCountry
  | getCountries
  | getCountriesDaily
  | getCountryDailyGrowth
  | setCountries