import {ADD_TODO, INIT_TODOS, UPDATE_TODO, EDIT_TODO} from '../actionTypes';

const addTodo = (payload: any) => {
  return {
    type: ADD_TODO,
    payload
  };
};

const initTodos = (payload: any[]) => {
  return {
    type: INIT_TODOS,
    payload
  };
};

const updateTodo = (payload: any) => {
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