import React from 'react';

export default function (props: any) {
  console.log(props);
  return (
    <div className="todo-item">
      <span>{props.description}</span>
    </div>
  );
}