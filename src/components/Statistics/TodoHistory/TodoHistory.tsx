import React from 'react';
import {format, parseISO} from 'date-fns';
import {connect} from 'react-redux';
import {getTodosByFilter, groupByDay} from '../../../redux/selectors';
import {TODO_FILTERS} from '../../../constants';

import TodoHistoryItem from '../TodoHistoryItem/TodoHistoryItem';

import {Tabs} from 'antd';
import './TodoHistory.less';

const {TabPane} = Tabs;

interface ITodoHistoryProps {
  todos: any[],
  deletedTodos: any[],
  completedTodos: any[],
  completedTodosByDay: any
}

class TodoHistory extends React.Component<ITodoHistoryProps, any> {

  get completedDates() {
    const dates = Object.keys(this.props.completedTodosByDay);
    return dates.sort((a, b) => (Date.parse(b) - Date.parse(a)));
  }

  public render() {
    const completedList = this.completedDates.map((date) => {
      const todos = this.props.completedTodosByDay[date];
      return (
        <div key={date} className="daily-todos">
          <div className="title">
            <p className="date">
              <span className="date-time">{format(parseISO(date), 'M月dd日')}</span>
              <span className="week-time">周五</span>
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
    const deletedList = this.props.deletedTodos.map((todo) => {
      return (
        <div key={todo.id}>
          <TodoHistoryItem key={todo.id} todo={todo} type="deleted"/>
        </div>
      );
    });
    return (
      <div className="todo-history">
        <Tabs className="todo-history-tabs" type="card">
          <TabPane className="todo-history-tab-pane" tab="已完成的任务" key="1">
            {
              completedList
            }
          </TabPane>
          <TabPane className="todo-history-tab-pane" tab="已删除的任务" key="2">
            {
              deletedList
            }
          </TabPane>
        </Tabs>
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