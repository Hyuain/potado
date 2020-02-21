import {ADD_TODO, INIT_TODOS, UPDATE_TODO, EDIT_TODO} from '../actionTypes';

const addTodo = (payload: Todo) => {
  return {
    type: ADD_TODO,
    payload
  };
};

const initTodos = (payload: Todo[]) => {
  return {
    type: INIT_TODOS,
    payload
  };
};

const updateTodo = (payload: Todo) => {
  return {
    type: UPDATE_TODO,
    payload
  };
};

const editTodo = (payload: number) => {
  return {
    type: EDIT_TODO,
    payload
  };
};

export default {
  addTodo,
  initTodos,
  updateTodo,
  editTodo
}