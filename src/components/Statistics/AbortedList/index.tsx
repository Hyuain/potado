import React from 'react';
import TodoHistoryItem from '@/components/Statistics/TodoHistoryItem';
import TomatoHistoryItem from '@/components/Statistics/TomatoHistoryItem';

const AbortedList = (props: any) => {
  if (props.todos) {
    return (
      props.todos.map((todo: any) => (
        <div key={todo.id}>
          <TodoHistoryItem key={todo.id} todo={todo} type="deleted"/>
        </div>
      ))
    );
  } else if (props.tomatoes) {
    return (
      props.tomatoes.map((tomato: any) => (
        <div key={tomato.id}>
          <TomatoHistoryItem key={tomato.id} tomato={tomato} type="aborted"/>
        </div>
      ))
    );
  } else {
    return null;
  }
};

export default AbortedList;