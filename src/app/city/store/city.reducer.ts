import { City } from "../city.model";
import * as CityActions from "./city.actions";

export interface State {
  cityList: City[];
}

const initialState: State = {
  cityList: []
}

export function cityReducer(state: State = initialState, action: CityActions.CityActions) {
  switch(action.type) {

    

    default: 
      return state;

  }

}