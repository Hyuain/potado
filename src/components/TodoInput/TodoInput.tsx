import React from 'react';
import {Input, Icon} from 'antd';
import './TodoInput.less'

export default function (props: any) {
  const [description, setDescription] = React.useState('');

  const onKeyup = (e: any) => {
    if (e.keyCode === 13 && description !== '') {
      addTodo();
    }
  };

  const addTodo = () => {
    props.addTodo({description});
    setDescription('');
  };

  const suffix = description ? <Icon type="enter" onClick={addTodo}/> : <span/>;

  return (
    <div className="todo-input">
      <Input
        placeholder="添加新任务"
        suffix={suffix}
        value={description}
        onChange={e => {
          setDescription(e.target.value);
        }}
        onKeyUp={onKeyup}
      />
    </div>
  );
}