import {ADD_TODO} from '../actionTypes'

export default function (state = [], action: any) {
  switch (action.type) {
    case ADD_TODO:
      return [state, ...action.payload];
    default:
      return state;
  }
}