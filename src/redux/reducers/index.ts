import {combineReducers} from 'redux';
import todos from './todos';
import tomatoes from './tomatoes';

const rootReducer = combineReducers({
  todos,
  tomatoes
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;