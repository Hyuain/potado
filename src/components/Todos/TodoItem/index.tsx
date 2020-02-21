import React from 'react';
import axios from '@/api/axios';
import classNames from 'classnames';

import {Checkbox, Icon, message} from 'antd';
import './style.less';

interface ITodoItemProps {
  id: number,
  description: string,
  completed: boolean,
  editing: boolean,
  updateTodo: (payload: any) => any,
  editTodo: (id: number) => any
}

const TodoItem = (props: ITodoItemProps) => {

  const [textContent, setTextContent] = React.useState(props.description);

  const onClickEnter = () => {
    if (inputCheck()) {
      updateTodo({description: textContent});
    }
  };

  const onClickDelete = () => {
    updateTodo({deleted: true});
  };

  const onKeyUp = (e: any) => {
    if (e.keyCode === 13) {
      if (inputCheck()) {
        updateTodo({description: textContent});
      }
    }
  };

  const inputCheck = () => {
    if (textContent === '') {
      message.warning('还是说点儿什么吧');
      return false;
    }
    return true;
  };

  const updateTodo = async (params: any) => {
    if (params.completed) {
      params.completed_at = new Date();
    }
    try {
      const response = await axios.put(`todos/${props.id}`, params);
      props.updateTodo(response.data.resource);
    } catch (e) {
      message.error('网络好像有点不太好哦，一会儿再试吧');
    }
  };

  const editTodo = () => {
    props.editTodo(props.id);
  };

  const EditField = (
    <div className="edit-filed">
      <input type="text"
             value={textContent}
             onChange={(e) => {
               setTextContent(e.target.value);
             }}
             onKeyUp={onKeyUp}
      />
      <div className="icon-wrapper">
        <Icon type="enter" onClick={onClickEnter}/>
        <Icon type="delete" theme="filled" onClick={onClickDelete}/>
      </div>
    </div>
  );

  const Text = (
    <span className="text" onDoubleClick={editTodo}>{textContent}</span>
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
          updateTodo({completed: e.target.checked});
        }}
      />
      {props.editing ? EditField : Text}
    </div>
  );
};

export default TodoItem;