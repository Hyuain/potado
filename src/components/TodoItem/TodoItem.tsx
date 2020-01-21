import React from 'react';
import {Checkbox} from 'antd';

interface ITodoItemProps {
  id: number;
  description: string;
  completed: boolean;
  editing: boolean;
  update: (id: number, params: any) => void;
  toEditing: (id: number)=> void;
}

export default function (props: ITodoItemProps) {

  const update = (params: any) => {
    props.update(props.id, params);
  };

  const toEditing = () => {
    props.toEditing(props.id);
  };

  return (
    <div className="todo-item">
      <Checkbox
        checked={props.completed}
        onChange={(e) => {
          update({completed: e.target.checked});
        }}
      />
      {
        props.editing ?
          <input type="text" value={props.description}/> :
          <span onDoubleClick={toEditing}>{props.description}</span>
      }
    </div>
  );
}