import React from 'react';
import axios from '../../../config/axios';
import {format, parseISO} from 'date-fns';
import {getFriendlyDate} from '../../../utils/helpers';

import {connect} from 'react-redux';
import actions from '../../../redux/actions';

import './TodoHistoryItem.less';


interface ITodoHistoryItemProps {
  todo: any,
  type: string,
  updateTodo: (payload: any) => void
}

class TodoHistoryItem extends React.Component<ITodoHistoryItemProps, any> {


  updateTodo = async (params: any) => {
    try {
      const response = await axios.put(`todos/${this.props.todo.id}`, params);
      this.props.updateTodo(response.data.resource);
    } catch (e) {

    }
  };

  render() {
    let time = null;
    if (this.props.type === 'completed') {
      time = (<span className="time">{format(parseISO(this.props.todo.completed_at), 'HH:mm')}</span>);
    } else if (this.props.type === 'deleted') {
      time = (<span className="time">{getFriendlyDate(this.props.todo.created_at,'monthAndDay')}</span>);
    }

    let action = null;
    if (this.props.type === 'completed') {
      action = (
        <div className="action">
          <span onClick={() => this.updateTodo({completed: false})}>恢复</span>
          <span onClick={() => this.updateTodo({deleted: true})}>删除</span>
        </div>
      );
    } else if (this.props.type === 'deleted') {
      action = (
        <div className="action">
          <span onClick={() => this.updateTodo({deleted: false})}>恢复</span>
        </div>
      );
    }

    return (
      <div>
        <div className="todo-history-item">
          <div className="text">
            {
              time
            }
            <span className="description">{this.props.todo.description}</span>
          </div>
          {
            action
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
});

const mapDispatchToProps = {
  updateTodo: actions.updateTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoHistoryItem);