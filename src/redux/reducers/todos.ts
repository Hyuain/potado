import {ADD_TODO, INIT_TODOS, UPDATE_TODO, EDIT_TODO} from '../actionTypes';

export default function (state: any[] = [], action: any) {
  switch (action.type) {
    case ADD_TODO:
      return [state, ...action.payload];
    case INIT_TODOS:
      return [...action.payload];
    case UPDATE_TODO:
      return state.map(todo => {
        if (todo.id === action.payload.id) {
          return action.payload;
        } else {
          return todo;
        }
      });
    case EDIT_TODO:
      return state.map(todo => {
        if (todo.id === action.payload) {
          return Object.assign({},todo,{editing: true})
        } else {
          return Object.assign({},todo,{editing: false})
        }
      });
    default:
      return state;
  }
}