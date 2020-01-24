import {ADD_TOMATO, INIT_TOMATOES, UPDATE_TOMATO} from '../actionTypes';

export default function (state: any[] = [], action: any) {
  switch (action.type) {
    case ADD_TOMATO:
      return [action.payload, ...state];
    case INIT_TOMATOES:
      return [...action.payload];
    case UPDATE_TOMATO:
      return state.map(tomato => {
      if (tomato.id === action.payload.id) {
        return action.payload;
      } else {
        return tomato;
      }
    });
    default:
      return state;
  }
}