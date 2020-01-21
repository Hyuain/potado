import React from 'react';
import axios from '../../config/axios';
import './Todos.less';
import TodoInput from '../TodoInput/TodoInput';
import TodoItem from '../TodoItem/TodoItem';

export default function () {

  const [todos, setTodos] = React.useState<any[]>([]);

  React.useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async (params: any) => {
    try {
      const response = await axios.post('todos', params);
      setTodos([response.data.resource, ...todos]);
    } catch (e) {
    }
  };

  const getTodos = async () => {
    try {
      const response = await axios.get('todos');
      setTodos(response.data.resources);
    } catch (e) {
    }
  };

  const updateTodo = async (id: number, params: any) => {
    try {
      const response = await axios.put(`todos/${id}`, params);
      const newTodos = todos.map(todo => {
        if (id === todo.id) {
          return response.data.resource;
        } else {
          return todo
        }
      });
      setTodos(newTodos);
    } catch (e) {
    }
  };

  return (
    <div className="todos">
      <TodoInput addTodo={(params: any) => {
        addTodo(params);
      }}/>
      <main>
        {
          todos.map(todo => (
            <TodoItem
              key={todo.id} {...todo}
              update={updateTodo}
            />
          ))
        }
      </main>
    </div>
  );
}