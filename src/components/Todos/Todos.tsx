import React from 'react';

import {connect} from 'react-redux';
import actions from '../../redux/actions';
import {TODO_FILTERS} from '../../constants';
import {getTodosByFilter} from '../../redux/selectors';

import TodoInput from './TodoInput/TodoInput';
import TodoItem from './TodoItem/TodoItem';
import './Todos.less';

interface ITodosProps {
  incompleteTodos: any,
  updateTodo: (payload: any) => any,
  editTodo: (id: number) => any,
  addTodo: (payload: any) => any
}

const Todos = (props: ITodosProps) => {

  return (
    <div className="todos">
      <TodoInput
        addTodo={props.addTodo}
      />
      <div className="todo-list">
        {
          props.incompleteTodos.map((todo: any) => (
            <TodoItem
              key={todo.id} {...todo}
              updateTodo={props.updateTodo}
              editTodo={props.editTodo}
            />
          ))
        }
      </div>
    </div>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const incompleteTodos = getTodosByFilter(state, TODO_FILTERS.INCOMPLETE);
  return {
    incompleteTodos,
    ...ownProps
  };
};

const mapDispatchToProps = {
  addTodo: actions.addTodo,
  editTodo: actions.editTodo,
  updateTodo: actions.updateTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);