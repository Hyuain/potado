import {ADD_TODO, INIT_TODOS, UPDATE_TODO, EDIT_TODO} from '../actionTypes';

interface AddTodoAction {
  type: typeof ADD_TODO
  payload: Todo
}

interface InitTodosAction {
  type: typeof INIT_TODOS
  payload: Todo[]
}

interface UpdateTodoAction {
  type: typeof UPDATE_TODO
  payload: Todo
}

interface EditTodoAction {
  type: typeof EDIT_TODO
  payload: number
}

type TodosActionTypes = AddTodoAction | InitTodosAction | UpdateTodoAction | EditTodoAction

export default function (state: Todo[] = [], action: TodosActionTypes) {
  switch (action.type) {
    case ADD_TODO:
      return [action.payload, ...state];
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
          return Object.assign({}, todo, {editing: true});
        } else {
          return Object.assign({}, todo, {editing: false});
        }
      });
    default:
      return state;
  }
}