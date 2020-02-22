import React from 'react';
import TodoHistoryItem from '@/components/Statistics/TodoHistoryItem';
import TomatoHistoryItem from '@/components/Statistics/TomatoHistoryItem';

interface IAbortedListProps {
  tomatoes?: Tomato[]
  todos?: Todo[]
}

const AbortedList = (props: IAbortedListProps) => {
  if (props.todos) {
    return (
      <div>
        {
          props.todos.map((todo) => (
            <div key={todo.id}>
              <TodoHistoryItem key={todo.id} todo={todo} type="deleted"/>
            </div>
          ))
        }
      </div>
    );
  } else if (props.tomatoes) {
    return (
      <div>
        {
          props.tomatoes.map((tomato) => (
            <div key={tomato.id}>
              <TomatoHistoryItem key={tomato.id} tomato={tomato} type="aborted"/>
            </div>
          ))
        }
      </div>
    );
  } else {
    return null;
  }
};

export default AbortedList;