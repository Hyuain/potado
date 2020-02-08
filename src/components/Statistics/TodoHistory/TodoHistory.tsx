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
  });
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
  todos: any[],
  deletedTodos: any[],
  completedTodos: any[],
  completedTodosByDay: any
}

interface ITodoHistoryState {
  tabIndex: string | undefined,
  deletedListProps: any,
  completedProps: any
}

class TodoHistory extends React.Component<ITodoHistoryProps, ITodoHistoryState> {

  constructor(props: ITodoHistoryProps) {
    super(props);
    this.state = {
      tabIndex: '1',
      deletedListProps: this.deletedTodosByPage[0],
      completedProps: this.completedDates[0]
    };
  }

  get completedDates() {
    const dates = Object.keys(this.props.completedTodosByDay);
    dates.sort((a, b) => (Date.parse(b) - Date.parse(a)));
    return groupByLength(dates, 1);
  }

  get deletedTodosByPage() {
    return groupByLength(this.props.deletedTodos, 10);
  }

  public render() {

    let total: number;
    if (this.state.tabIndex === '1') {
      total = this.completedDates.length;
    } else {
      total = this.props.deletedTodos.length;
    }

    const onPageChange = (current: any) => {
      if (this.state.tabIndex === '1') {
        this.setState({completedProps: this.completedDates[current - 1]});
      } else {
        this.setState({deletedListProps: this.deletedTodosByPage[current - 1]});
      }
    };

    let pageSize = 10;
    if (this.state.tabIndex === '1') {
      pageSize = 1;
      console.log(total);
    } else {
      pageSize = 10;
    }

    const Pages = (
      <Pagination
        total={total}
        onChange={onPageChange}
        pageSize={pageSize}
      ></Pagination>
    );


    return (
      <div className="todo-history">
        <Tabs
          className="todo-history-tabs"
          type="card"
          activeKey={this.state.tabIndex}
          onChange={(current: string) => this.setState({tabIndex: current})}
        >
          <TabPane className="todo-history-tab-pane" tab="已完成的任务" key="1">
            <CompletedList dates={this.state.completedProps} todos={this.props.completedTodosByDay}></CompletedList>
          </TabPane>
          <TabPane className="todo-history-tab-pane" tab="已删除的任务" key="2">
            <DeletedList todos={this.state.deletedListProps}></DeletedList>
          </TabPane>
        </Tabs>
        {
          Pages
        }
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  const todos = state.todos;
  const deletedTodos = getTodosByFilter(state, TODO_FILTERS.DELETED);
  const completedTodos = getTodosByFilter(state, TODO_FILTERS.COMPLETED);
  const completedTodosByDay = groupByDay(completedTodos, 'completed_at');
  return {
    todos,
    completedTodos,
    completedTodosByDay,
    deletedTodos,
    ...ownProps
  };
};

export default connect(mapStateToProps)(TodoHistory);