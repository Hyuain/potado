import React from 'react';
import {groupByLength} from '../../../utils/helpers';

import {connect} from 'react-redux';
import {getTodosByFilter, groupByDay} from '../../../redux/selectors';
import {TODO_FILTERS} from '../../../constants';

import AbortedList from '../AbortedList/AbortedList';
import CompletedList from '../CompletedList/CompletedList';

import {Tabs, Pagination} from 'antd';
import './TodoHistory.less';

const {TabPane} = Tabs;

interface ITodoHistoryProps {
  deletedTodos: any[],
  deletedTodosByPage: any[],
  completedTodosByDay: any[],
  completedDatesByPage: any[],
  completedDates: any[]
}

interface ITodoHistoryState {
  deletedCurrent: number,
  completedCurrent: number
}

class TodoHistory extends React.Component<ITodoHistoryProps, ITodoHistoryState> {

  constructor(props: ITodoHistoryProps) {
    super(props);
    this.state = {
      deletedCurrent: 1,
      completedCurrent: 1
    };
  }

  public render() {
    return (
      <div className="todo-history">
        <Tabs className="todo-history-tabs" type="card">

          <TabPane className="todo-history-tab-pane" tab="已完成的任务" key="1">
            <CompletedList dates={this.props.completedDatesByPage[this.state.completedCurrent - 1]}
                           todos={this.props.completedTodosByDay}></CompletedList>
            <Pagination
              className="pagination"
              total={this.props.completedDates.length}
              onChange={(current: number) => {
                this.setState({completedCurrent: current});
              }}
              pageSize={5}
            />
          </TabPane>

          <TabPane className="todo-history-tab-pane" tab="已删除的任务" key="2">
            <AbortedList todos={this.props.deletedTodosByPage[this.state.deletedCurrent - 1]}></AbortedList>
            <Pagination
              className="pagination"
              total={this.props.deletedTodos.length}
              onChange={(current: number) => {
                this.setState({deletedCurrent: current});
              }}
              pageSize={10}
            />
          </TabPane>

        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  const deletedTodos = getTodosByFilter(state, TODO_FILTERS.DELETED);
  const deletedTodosByPage = groupByLength(deletedTodos, 10);
  const completedTodos = getTodosByFilter(state, TODO_FILTERS.COMPLETED);
  const completedTodosByDay = groupByDay(completedTodos, 'completed_at');
  const completedDates = Object.keys(completedTodosByDay).sort((a, b) => (Date.parse(b) - Date.parse(a)));
  const completedDatesByPage = groupByLength(completedDates, 5);

  return {
    deletedTodos,
    deletedTodosByPage,
    completedTodosByDay,
    completedDates,
    completedDatesByPage,
    ...ownProps
  };
};

export default connect(mapStateToProps)(TodoHistory);