import React from 'react';
import {Checkbox, Icon} from 'antd';

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

  const Editing = (
    <div className="editing">
      <input type="text"
             value={textContent}
             onChange={(e) => {
               setTextContent(e.target.value);
             }}
             onKeyUp={onKeyup}
      />
      <div className="iconWrapper">
        <Icon type="enter"/>
        <Icon type="delete" theme="filled" onClick={() => update({deleted: true})}/>
      </div>
    </div>
  );

  const Text = (<span onDoubleClick={toEditing}>{textContent}</span>);

  return (
    <div className="todo-item">
      <Checkbox
        checked={props.completed}
        onChange={(e) => {
          update({completed: e.target.checked});
        }}
      />
      {props.editing ? Editing : Text}
    </div>
  );
}