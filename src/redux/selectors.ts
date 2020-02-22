import {RootState} from '@/redux/reducers';

export const getTodos = (state: RootState) => (state.todos);

export const getNotDeletedTodos = (state: RootState) => {
  const allTodos = getTodos(state);
  return allTodos.filter((todo) => (!todo.deleted));
};

export const getDeletedTodos = (state: RootState) => {
  const allTodos = getTodos(state);
  return allTodos.filter((todo) => (todo.deleted));
};

export const getCompletedTodos = (state: RootState) => {
  const notDeletedTodos = getNotDeletedTodos(state);
  return notDeletedTodos.filter((todo) => (todo.completed));
};

export const getIncompleteTodos = (state: RootState) => {
  const notDeletedTodos = getNotDeletedTodos(state);
  return notDeletedTodos.filter((todo) => (!todo.completed));
};

export const getTomatoes = (state: RootState) => (state.tomatoes);

export const getFinishedTomatoes = (state: RootState) => {
  const allTomatoes = getTomatoes(state);
  return allTomatoes.filter((tomato) => (tomato.description && tomato.ended_at && !tomato.aborted));
};

export const getUnfinishedTomato = (state: RootState) => {
  const allTomatoes = getTomatoes(state);
  return allTomatoes.filter((tomato) => (!tomato.description && !tomato.ended_at && !tomato.aborted))[0];
};

export const getAbortedTomatoes = (state: RootState) => {
  const allTomatoes = getTomatoes(state);
  return allTomatoes.filter((tomato) => (!tomato.ended_at && tomato.aborted));
};

