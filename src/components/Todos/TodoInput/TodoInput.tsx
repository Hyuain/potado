import React from 'react';
import axios from '../../../config/axios';

import {Input, Icon, message} from 'antd';
import './TodoInput.less';

interface ITodoInputProps {
  addTodo: (payload: any) => any
}

const TodoInput = (props: ITodoInputProps) => {
  const [description, setDescription] = React.useState('');

  const onKeyUp = (e: any) => {
    if (e.keyCode === 13) {
      if (inputCheck()) {
        addTodo();
      }
    }
  };

  const onClick = () => {
    if (inputCheck()) {
      addTodo();
    }
  };

  const inputCheck = () => {
    if (description === '') {
      message.warning('还是说点儿什么吧');
      return false;
    }
    return true;
  };

  const addTodo = async () => {
    try {
      const response = await axios.post('todos', {description});
      setDescription('');
      props.addTodo(response.data.resource);
    } catch (e) {
      message.error('网络好像有点不太好哦，一会儿再试吧');
    }
  };

  const EnterIcon = description ? <Icon type="enter" onClick={onClick}/> : <span/>;

  return (
    <div className="todo-input">
      <Input
        placeholder="添加新任务"
        suffix={EnterIcon}
        value={description}
        onChange={e => {
          setDescription(e.target.value);
        }}
        onKeyUp={onKeyUp}
      />
    </div>
  );
};

export default TodoInput;