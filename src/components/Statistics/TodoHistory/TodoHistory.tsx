import React from 'react';
import {connect} from 'react-redux';
import {getTodosByFilter, groupByDay} from '../../../redux/selectors';
import {TODO_FILTERS} from '../../../constants';
import {getFriendlyDate, groupByLength} from '../../../utils/helpers';

import TodoHistoryItem from '../TodoHistoryItem/TodoHistoryItem';

import {Tabs, Pagination} from 'antd';
import './TodoHistory.less';

const {TabPane} = Tabs;

const CompletedList = (props: any) => {
  return (
    props.dates.map((date: string) => {
      const todos = props.todos[date];
      return (
        <div key={date} className="daily-todos">
          <div className="title">
            <p className="date">
              <span className="date-time">{getFriendlyDate(date, 'monthAndDay')}</span>
              <span className="week-time">{getFriendlyDate(date, 'dayOfWeek')}</span>
            </p>
            <span className="finished-count">完成了 {todos.length} 个任务</span>
          </div>
          <div className="details">
            {
              todos.map((todo: any) => (<TodoHistoryItem key={todo.id} todo={todo} type="completed"/>))
            }
          </div>
        </div>
      );
    })
  );
};

const DeletedList = (props: any) => {
  return (
    props.todos.map((todo: any) => (
      <div key={todo.id}>
        <TodoHistoryItem key={todo.id} todo={todo} type="deleted"/>
      </div>
    ))
  );
};

interface ITodoHistoryProps {
  deletedTodos: any[],
  completedTodosByDay: any,
  completedDatesByPage: any[],
  deletedTodosByPage: any[],
  completedDates: any[]
}

interface ITodoHistoryState {
  tabIndex: string | undefined,
  deletedTodosEachPage: any,
  completedDatesEachPage: any
}

class TodoHistory extends React.Component<ITodoHistoryProps, ITodoHistoryState> {

  constructor(props: ITodoHistoryProps) {
    super(props);
    this.state = {
      tabIndex: '1',
      deletedTodosEachPage: props.deletedTodosByPage[0],
      completedDatesEachPage: props.completedDatesByPage[0]
    };
  }

  public render() {
    return (
      <div className="todo-history">
        <Tabs
          className="todo-history-tabs"
          type="card"
          activeKey={this.state.tabIndex}
          onChange={(current: string) => this.setState({tabIndex: current})}
        >
          <TabPane className="todo-history-tab-pane" tab="已完成的任务" key="1">
            <CompletedList dates={this.state.completedDatesEachPage}
                           todos={this.props.completedTodosByDay}></CompletedList>
            <Pagination
              total={this.props.completedDates.length}
              onChange={(current: number) => {
                this.setState({completedDatesEachPage: this.props.completedDatesByPage[current - 1]});
              }}
              pageSize={1}
            />
          </TabPane>
          <TabPane className="todo-history-tab-pane" tab="已删除的任务" key="2">
            <DeletedList todos={this.state.deletedTodosEachPage}></DeletedList>
            <Pagination
              total={this.props.deletedTodos.length}
              onChange={(current: number) => {
                this.setState({deletedTodosEachPage: this.props.deletedTodosByPage[current - 1]});
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
  const completedTodos = getTodosByFilter(state, TODO_FILTERS.COMPLETED);
  const completedTodosByDay = groupByDay(completedTodos, 'completed_at');
  const completedDates = Object.keys(completedTodosByDay).sort((a, b) => (Date.parse(b) - Date.parse(a)));
  const completedDatesByPage = groupByLength(completedDates, 1);
  const deletedTodosByPage = groupByLength(deletedTodos, 10);

  return {
    completedTodosByDay,
    completedDates,
    completedDatesByPage,
    deletedTodos,
    deletedTodosByPage,
    ...ownProps
  };
};

export default connect(mapStateToProps)(TodoHistory);