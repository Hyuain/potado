import React from 'react';

import {connect} from 'react-redux';
import actions from '../../redux/actions';
import {TODO_FILTERS} from '../../constants';
import {getTodosByFilter} from '../../redux/selectors';

import TodoInput from './TodoInput/TodoInput';
import TodoItem from './TodoItem/TodoItem';
import './Todos.less';


const Todos = (props: any) => {

  return (
    <div className="todos">
      <TodoInput/>
      <div className="todo-list">
        {
          props.incompleteTodos.map((todo: any) => (
            <TodoItem
              key={todo.id} {...todo}
            />
          ))
        }
      </div>
    </div>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const todos = state.todos;
  const completedTodos = getTodosByFilter(state, TODO_FILTERS.COMPLETED);
  const incompleteTodos = getTodosByFilter(state, TODO_FILTERS.INCOMPLETE);
  return {
    todos,
    completedTodos,
    incompleteTodos,
    ...ownProps
  };
};

const mapDispatchToProps = {
  updateTodo: actions.updateTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);