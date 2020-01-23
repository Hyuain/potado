import React from 'react';
import {connect} from 'react-redux';
import {addTodo} from '../../redux/actions';
import axios from '../../config/axios';

import {Input, Icon} from 'antd';
import './TodoInput.less';

interface ITodoInputProps {
  addTodo: (payload: any) => any
}

const TodoInput = (props: ITodoInputProps) => {
  const [description, setDescription] = React.useState('');

  const onKeyup = (e: any) => {
    if (e.keyCode === 13 && description !== '') {
      postTodo();
    }
  };

  const postTodo = async () => {
    try {
      const response = await axios.post('todos', {description});
      props.addTodo(response.data.resource);
    } catch (e) {

    }
    setDescription('');
  };

  const suffix = description ? <Icon type="enter" onClick={postTodo}/> : <span/>;

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
};

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
});

const mapDispatchToProps = {
  addTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoInput);