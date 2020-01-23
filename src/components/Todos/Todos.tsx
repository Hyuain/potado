import React from 'react';
import axios from '../../config/axios';
import {connect} from 'react-redux';
import {initTodos,updateTodo,editTodo} from '../../redux/actions';
import {TODO_FILTERS} from '../../constants';
import {getTodosByFilter} from '../../redux/selectors';

import './Todos.less';
import TodoInput from '../TodoInput/TodoInput';
import TodoItem from '../TodoItem/TodoItem';


const Todos = (props:any) => {

  console.log('---');
  console.log(props.todos);
  console.log(props.completedTodos);
  console.log(props.incompleteTodos);
  console.log('---');

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
  }, []);

  const updateTodo = async (id: number, params: any) => {
    try {
      const response = await axios.put(`todos/${id}`, params);
      props.updateTodo(response.data.resource);
    } catch (e) {
    }
  };

  const toEditing = (id: number) => {
     props.editTodo(id)
  };

  return (
    <div className="todos">
      <TodoInput/>
      <div className="todo-list">
        {
          props.incompleteTodos.map((todo:any) => (
            <TodoItem
              key={todo.id} {...todo}
              update={updateTodo}
              toEditing={toEditing}
            />
          ))
        }
        {
          props.completedTodos.map((todo:any) => (
            <TodoItem
              key={todo.id} {...todo}
              update={updateTodo}
              toEditing={toEditing}
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
    ...ownProps};
};

const mapDispatchToProps = {
  initTodos,
  updateTodo,
  editTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);