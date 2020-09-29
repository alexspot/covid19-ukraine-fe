import { Country }         from '../country.model';
import * as CountryActions from './country.actions';

export interface State {
  countryList: Country[];
}

const initialState: State = {
  countryList: [new Country('0', 0, 0, 0, 0, '20200101')]
}

export function countryReducer(state: State = initialState, action: CountryActions.CountryActions) {
  switch(action.type) {

    case CountryActions.SET_COUNTRIES:
      return {
        ...state,
        countryList: action.payload
      }

    default:
      return state;  
  }
}