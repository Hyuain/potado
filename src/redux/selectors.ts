import {TODO_FILTERS, TOMATO_FILTERS} from '../constants';

export const getTodos = (store: any) => (store.todos);

export const getNotDeletedTodos = (store: any) => {
  const allTodos = getTodos(store);
  return allTodos.filter((todo: any) => (!todo.deleted));
};

export const getTodosByFilter = (store: any, todoFilter: any) => {
  const notDeletedTodos = getNotDeletedTodos(store);
  switch (todoFilter) {
    case TODO_FILTERS.COMPLETED:
      return notDeletedTodos.filter((todo: any) => (todo.completed));
    case TODO_FILTERS.INCOMPLETE:
      return notDeletedTodos.filter((todo: any) => (!todo.completed));
    default:
      return notDeletedTodos;
  }
};

export const getTomatoes = (store: any) => (store.tomatoes);

export const getTomatoesByFilter = (store: any, tomatoFilter: any) => {
  const allTomatoes = getTomatoes(store);
  switch (tomatoFilter) {
    case TOMATO_FILTERS.FINISHED:
      return allTomatoes.filter((tomato: any) => (tomato.description && tomato.ended_at && !tomato.aborted));
    case TOMATO_FILTERS.UNFINISHED:
      return allTomatoes.filter((tomato: any) => (!tomato.description && !tomato.ended_at && !tomato.aborted))[0];
    default:
      return tomatoFilter;
  }
};