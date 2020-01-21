import React from 'react';
import {Checkbox} from 'antd';

interface ITodoItemProps {
  id: number;
  description: string;
  completed: boolean;
  update: (id: number, params: any) => void;
}

export default function (props: ITodoItemProps) {

  const update = (params: any) => {
    props.update(props.id, params);
  };

  return (
    <div className="todo-item">
      <Checkbox
        checked={props.completed}
        onChange={(e) => {
          update({completed: e.target.checked});
        }}
      />
      <span>{props.description}</span>

    </div>
  );
}