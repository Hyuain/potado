import React from 'react';
import moment from 'moment';
import axios from '@/api/axios';
import {getFriendlyDate} from '@/api/utils';
import {connect} from 'react-redux';
import actions from '@/redux/actions';
import {RootState} from '@/redux/reducers';
import {Dispatch} from 'redux';
import './style.less';
import {message} from 'antd';


interface ITodoHistoryItemProps {
  todo: Todo
  type: 'completed' | 'deleted'
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

class TodoHistoryItem extends React.Component<ReduxType> {

  updateTodo = async (params: TodoUpdateParams) => {
    try {
      const response = await axios.put<TodoUpdateResponse>(`todos/${this.props.todo.id}`, params);
      this.props.updateTodo(response.data.resource);
    } catch (e) {
      message.error('网络好像有点不太好哦，一会儿再试吧');
    }
  };

  render() {
    let Time = null;
    if (this.props.type === 'completed') {
      Time = (<span className="time">{moment(this.props.todo.completed_at).format('HH:mm')}</span>);
    } else if (this.props.type === 'deleted') {
      Time = (<span className="time">{getFriendlyDate(this.props.todo.created_at, 'monthAndDay')}</span>);
    }

    let Action = null;
    if (this.props.type === 'completed') {
      Action = (
        <div className="action">
          <span onClick={() => this.updateTodo({completed: false})}>恢复</span>
          <span onClick={() => this.updateTodo({deleted: true})}>删除</span>
        </div>
      );
    } else if (this.props.type === 'deleted') {
      Action = (
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
              Time
            }
            <span className="description">{this.props.todo.description}</span>
          </div>
          {
            Action
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: ITodoHistoryItemProps) => ({
  ...ownProps
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateTodo(payload: Todo) {
      dispatch(actions.updateTodo(payload));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoHistoryItem);