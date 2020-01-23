import React from 'react';
import axios from '../../config/axios';
import {connect} from 'react-redux';
import {addTodo} from '../../redux/actions';

import './Todos.less';
import TodoInput from '../TodoInput/TodoInput';
import TodoItem from '../TodoItem/TodoItem';

const Todos = () => {

  const [todos, setTodos] = React.useState<any[]>([]);
  // eslint-disable-next-line
  const [unDeletedTodos, setUnDeletedTodos] = React.useState<any[]>([]);
  const [unCompletedTodos, setUnCompletedTodos] = React.useState<any[]>([]);
  const [completedTodos, setCompletedTodos] = React.useState<any[]>([]);


  React.useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await axios.get('todos');
        const todos = response.data.resources.map((todo: any) => Object.assign({}, todo, {editing: false}));
        resetTodos(todos);
      } catch (e) {
      }
    };
    getTodos();
  }, []);

  const resetTodos = (newTodos: any) => {
    const unDeletedTodos = newTodos.filter((todo: any) => !todo.deleted);
    const unCompletedTodos = unDeletedTodos.filter((todo: any) => !todo.completed);
    const completeTodos = unDeletedTodos.filter((todo: any) => todo.completed);
    setTodos(newTodos);
    setUnDeletedTodos(unDeletedTodos);
    setUnCompletedTodos(unCompletedTodos);
    setCompletedTodos(completeTodos);
  };

  const addTodo = async (params: any) => {
    try {
      const response = await axios.post('todos', params);
      resetTodos([response.data.resource, ...todos]);
    } catch (e) {
      console.error(e);
    }
  };


  const updateTodo = async (id: number, params: any) => {
    try {
      const response = await axios.put(`todos/${id}`, params);
      const newTodos = todos.map(todo => {
        if (id === todo.id) {
          return response.data.resource;
        } else {
          return todo;
        }
      });
      resetTodos(newTodos);
    } catch (e) {
    }
  };

  const toEditing = (id: number) => {
    const newTodos = todos.map(todo => {
      if (id === todo.id) {
        return Object.assign({}, todo, {editing: true});
      } else {
        return Object.assign({}, todo, {editing: false});
      }
    });
    resetTodos(newTodos);
  };

  return (
    <div className="todos">
      <TodoInput/>
      <div className="todo-list">
        {
          unCompletedTodos.map(todo => (
            <TodoItem
              key={todo.id} {...todo}
              update={updateTodo}
              toEditing={toEditing}
            />
          ))
        }
        {
          completedTodos.map(todo => (
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

const mapStateToProps = (state:any, ownProps:any) => ({
  todos: state.todos,
  ...ownProps
});

const mapDispatchToProps = {
  addTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);