import _ from 'lodash';
import {format, parseISO} from 'date-fns';
import {TODO_FILTERS, TOMATO_FILTERS} from '@/constants';
import {RootState} from '@/redux/reducers';

export const getTodos = (state: RootState) => (state.todos);

export const getNotDeletedTodos = (state: RootState) => {
  const allTodos = getTodos(state);
  return allTodos.filter((todo: any) => (!todo.deleted));
};

export const getDeletedTodos = (state: RootState) => {
  const allTodos = getTodos(state);
  return allTodos.filter((todo: any) => (todo.deleted));
};

export const getCompletedTodos = (state: RootState) => {
  const notDeletedTodos = getNotDeletedTodos(state);
  return notDeletedTodos.filter((todo: any) => (todo.completed));
};

export const getIncompleteTodos = (state: RootState) => {
  const notDeletedTodos = getNotDeletedTodos(state);
  return notDeletedTodos.filter((todo: any) => (!todo.completed));
};

export const getTodosByFilter = (state: any, todoFilter: string) => {
  const allTodos = getTodos(state);
  const notDeletedTodos = getNotDeletedTodos(state);
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

const getTomatoes = (state: any) => (state.tomatoes);

export const getTomatoesByFilter = (state: any, tomatoFilter: string) => {
  const allTomatoes = getTomatoes(state);
  switch (tomatoFilter) {
    case TOMATO_FILTERS.FINISHED:
      return allTomatoes.filter((tomato: any) => (tomato.description && tomato.ended_at && !tomato.aborted));
    case TOMATO_FILTERS.UNFINISHED:
      return allTomatoes.filter((tomato: any) => (!tomato.description && !tomato.ended_at && !tomato.aborted))[0];
    case TOMATO_FILTERS.ABORTED:
      return allTomatoes.filter((tomato: any) => (!tomato.ended_at && tomato.aborted));
    default:
      return tomatoFilter;
  }
};

export const groupByDay = (dataBeforeGroup: any[], keyOfTime: string) => {
  return _.groupBy(dataBeforeGroup, (item) => {
    return (format(parseISO(item[keyOfTime]), 'yyyy-MM-dd'));
  });
};