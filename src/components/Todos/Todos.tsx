import React from 'react';
import TodoInput from '../TodoInput/TodoInput';
import axios from '../../config/axios';
import './Todos.less';


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

  return (
    <div className="todos">
      <TodoInput addTodo={(params: any) => {
        addTodo(params);
      }}/>
      <main>
        {
          todos.map(todo => {
            return <div key={todo.id}>{todo.description}</div>;
          })
        }
      </main>
    </div>
  );
}