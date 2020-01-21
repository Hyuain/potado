import React from 'react';
import {Checkbox, Icon} from 'antd';
import classNames from 'classnames';
import './TodoItem.less';

interface ITodoItemProps {
  id: number;
  description: string;
  completed: boolean;
  editing: boolean;
  update: (id: number, params: any) => void;
  toEditing: (id: number) => void;
}

export default function (props: ITodoItemProps) {

  const [textContent, setTextContent] = React.useState(props.description);

  const update = (params: any) => {
    props.update(props.id, params);
  };

  const toEditing = () => {
    props.toEditing(props.id);
  };

  const onKeyup = (e: any) => {
    if (e.keyCode === 13 && textContent !== '') {
      update({description: textContent});
    }
  };

  const EditField = (
    <div className="edit-filed">
      <input type="text"
             value={textContent}
             onChange={(e) => {
               setTextContent(e.target.value);
             }}
             onKeyUp={onKeyup}
      />
      <div className="icon-wrapper">
        <Icon type="enter" onClick={() => {
          update({description: textContent});
        }}/>
        <Icon type="delete" theme="filled" onClick={() => update({deleted: true})}/>
      </div>
    </div>
  );

  const Text = (
    <span className="text" onDoubleClick={toEditing}>{textContent}</span>
  );

  const todoItemClass = classNames({
    'todo-item': true,
    'editing': props.editing,
    'completed': props.completed
  });

  return (
    <div className={todoItemClass}>
      <Checkbox
        checked={props.completed}
        onChange={(e) => {
          update({completed: e.target.checked});
        }}
      />
      {props.editing ? EditField : Text}
    </div>
  );
}