import React from 'react';
import TodoInput from '../TodoInput/TodoInput';
import axios from '../../config/axios';
import './Todos.less';


export default function () {

  const addTodo = async (params: any) => {
    try {
      const response = await axios.post('todos', params);
      console.log(response.data);
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <div className="todos">
      <TodoInput addTodo={(params: any) => {
        addTodo(params);
      }}/>
    </div>
  );
}