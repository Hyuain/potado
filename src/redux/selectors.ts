import {TODO_FILTERS} from '../constants';

export const getTodos = (store: any) => (store.todos);

export const getNotDeletedTodos = (store: any) => {
  const allTodos = getTodos(store);
  return allTodos.filter((todo: any) => (!todo.deleted));
};

export const getTodosByFilter = (store: any, todoFilter: any) => {
  const notDeletedTodos = getNotDeletedTodos(store);
  switch (todoFilter) {
    case TODO_FILTERS.COMPLETED:
      return notDeletedTodos.filter((todo:any) => (todo.completed));
    case TODO_FILTERS.INCOMPLETE:
      return notDeletedTodos.filter((todo:any) => (!todo.completed));
    default:
      return notDeletedTodos;
  }
};