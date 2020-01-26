import React from 'react';
import {connect} from 'react-redux';
import {getTodosByFilter, groupByDay} from '../../../redux/selectors';
import {TODO_FILTERS} from '../../../constants';

import {Tabs} from 'antd';

const {TabPane} = Tabs;

interface ITodoHistoryProps {
  todos: any[],
  deletedTodos: any[],
  deletedTodosByDay: any,
  completedTodos: any[],
  completedTodosByDay: any
}

const TodoHistoryItem = (props: any) => {
  return (
    <div>
      <span>{props.updated_at}</span>
      <span>{props.description}</span>
    </div>
  );
};

class TodoHistory extends React.Component<ITodoHistoryProps, any> {

  get completedDates() {
    const dates = Object.keys(this.props.completedTodosByDay);
    return dates.sort((a, b) => (Date.parse(b) - Date.parse(a)));
  }

  get deletedDates() {
    const dates = Object.keys(this.props.deletedTodosByDay);
    return dates.sort((a, b) => (Date.parse(b) - Date.parse(a)));
  }


  public render() {
    const completedList = this.completedDates.map((date) => {
      const todos = this.props.completedTodosByDay[date];
      return (
        <div key={date}>
          <div>
            <span>{date}</span>
            <span>完成了{todos.length}个任务</span>
          </div>
          <div>
            {
              todos.map((todo: any) => (<TodoHistoryItem key={todo.id} {...todo}/>))
            }
          </div>
        </div>
      );
    });
    const deletedList = this.deletedDates.map((date) => {
      const todos = this.props.deletedTodosByDay[date];
      return (
        <div key={date}>
          <div>
            <span>{date}</span>
            <span>完成了{todos.length}个任务</span>
          </div>
          <div>
            {
              todos.map((todo: any) => (<TodoHistoryItem key={todo.id} {...todo}/>))
            }
          </div>
        </div>
      );
    });
    return (
      <div className="todo-history">
        <Tabs type="card">
          <TabPane tab="已完成的任务" key="1">
            {
              completedList
            }
          </TabPane>
          <TabPane tab="已删除的任务" key="2">
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
  const deletedTodosByDay = groupByDay(deletedTodos, 'updated_at');
  const completedTodos = getTodosByFilter(state, TODO_FILTERS.COMPLETED);
  const completedTodosByDay = groupByDay(completedTodos, 'updated_at');
  return {
    todos,
    completedTodos,
    completedTodosByDay,
    deletedTodos,
    deletedTodosByDay,
    ...ownProps
  };
};

export default connect(mapStateToProps)(TodoHistory);