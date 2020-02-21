import {ADD_TOMATO, INIT_TOMATOES, UPDATE_TOMATO} from '../actionTypes';

interface AddTomatoAction {
  type: typeof ADD_TOMATO
  payload: Tomato
}

interface InitTomatoesAction {
  type: typeof INIT_TOMATOES
  payload: Tomato[]
}

interface UpdateTomatoAction {
  type: typeof UPDATE_TOMATO
  payload: Tomato
}

type TomatoesActionTypes = AddTomatoAction | InitTomatoesAction | UpdateTomatoAction

export default function (state: Tomato[] = [], action: TomatoesActionTypes) {
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