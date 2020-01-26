import React from 'react';
import axios from '../../config/axios';

import {connect} from 'react-redux';
import actions from '../../redux/actions';
import {TODO_FILTERS} from '../../constants';
import {getTodosByFilter} from '../../redux/selectors';

import TodoInput from './TodoInput/TodoInput';
import TodoItem from './TodoItem/TodoItem';
import './Todos.less';


const Todos = (props: any) => {

  React.useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await axios.get('todos');
        const todos = response.data.resources.map((todo: any) => Object.assign({}, todo, {editing: false}));
        props.initTodos(todos);
      } catch (e) {
      }
    };
    getTodos();
    // eslint-disable-next-line
  }, []);


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

const mapStateToProps = (state: any) => {
  const todos = state.todos;
  const completedTodos = getTodosByFilter(state, TODO_FILTERS.COMPLETED);
  const incompleteTodos = getTodosByFilter(state, TODO_FILTERS.INCOMPLETE);
  return {
    todos,
    completedTodos,
    incompleteTodos
  };
};

const mapDispatchToProps = {
  initTodos: actions.initTodos,
  updateTodo: actions.updateTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);