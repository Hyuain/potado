import _ from 'lodash';
import {format, parseISO} from 'date-fns';
import {TODO_FILTERS, TOMATO_FILTERS} from '../constants';

const getTodos = (store: any) => (store.todos);

const getNotDeletedTodos = (store: any) => {
  const allTodos = getTodos(store);
  return allTodos.filter((todo: any) => (!todo.deleted));
};

export const getTodosByFilter = (store: any, todoFilter: any) => {
  const allTodos = getTodos(store);
  const notDeletedTodos = getNotDeletedTodos(store);
  switch (todoFilter) {
    case TODO_FILTERS.DELETED:
      return allTodos.filter((todo: any) => (todo.deleted));
    case TODO_FILTERS.COMPLETED:
      return notDeletedTodos.filter((todo: any) => (todo.completed));
    case TODO_FILTERS.INCOMPLETE:
      return notDeletedTodos.filter((todo: any) => (!todo.completed));
    default:
      return notDeletedTodos;
  }
};

const getTomatoes = (store: any) => (store.tomatoes);

export const getTomatoesByFilter = (store: any, tomatoFilter: any) => {
  const allTomatoes = getTomatoes(store);
  switch (tomatoFilter) {
    case TOMATO_FILTERS.FINISHED:
      return allTomatoes.filter((tomato: any) => (tomato.description && tomato.ended_at && !tomato.aborted));
    case TOMATO_FILTERS.UNFINISHED:
      return allTomatoes.filter((tomato: any) => (!tomato.description && !tomato.ended_at && !tomato.aborted))[0];
    case TOMATO_FILTERS.ABORTED:
      return allTomatoes.filter((tomato: any)=>(!tomato.ended_at && tomato.aborted));
    default:
      return tomatoFilter;
  }
};

export const groupByDay = (dataBeforeGroup: any, keyOfTime: string) => {
  return _.groupBy(dataBeforeGroup, (item) => {
    return (format(parseISO(item[keyOfTime]), 'yyyy-MM-dd'));
  });
};