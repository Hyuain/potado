import React from 'react';
import axios from '../../../config/axios';
import classNames from 'classnames';

import {connect} from 'react-redux';
import actions from '../../../redux/actions';

import {Checkbox, Icon} from 'antd';
import './TodoItem.less';

interface ITodoItemProps {
  id: number;
  description: string;
  completed: boolean;
  editing: boolean;
  updateTodo: (payload: any) => any;
  editTodo: (id: number) => any;
}

const TodoItem = (props: ITodoItemProps) => {

  const [textContent, setTextContent] = React.useState(props.description);

  const updateTodo = async (params: any) => {
    if(params.completed){
      params.completed_at = new Date()
    }
    try {
      const response = await axios.put(`todos/${props.id}`, params);
      props.updateTodo(response.data.resource);
    } catch (e) {
    }
  };

  const editTodo = () => {
    props.editTodo(props.id);
  };

  const onKeyup = (e: any) => {
    if (e.keyCode === 13 && textContent !== '') {
      updateTodo({description: textContent});
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
          updateTodo({description: textContent});
        }}/>
        <Icon type="delete" theme="filled" onClick={() => updateTodo({deleted: true})}/>
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

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
});

const mapDispatchToProps = {
  editTodo: actions.editTodo,
  updateTodo: actions.updateTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItem);