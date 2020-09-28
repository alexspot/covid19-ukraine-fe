import { City }         from '../city.model';
import * as CityActions from './city.actions';

export interface State {
  cityList: City[];
  maxDate: String;
}

const initialState: State = {
  cityList: [],
  maxDate: ''
}

export function cityReducer(state: State = initialState, action: CityActions.CityActions) {
  switch(action.type) {

    case CityActions.SET_CITIES:
      return {
        ...state,
        cityList: action.payload
      }
    
    case CityActions.SET_MAX_DATE:
      return {
        ...state,
        maxDate: action.payload
      }  

    default: 
      return state;
  }
}