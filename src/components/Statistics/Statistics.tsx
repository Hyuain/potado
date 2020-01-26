import React from 'react';
import {connect} from 'react-redux';
import {TODO_FILTERS} from '../../constants';
import {getTodosByFilter, groupByDay} from '../../redux/selectors';

import Graph from './Graph/Graph';
import TodoHistory from './TodoHistory/TodoHistory';
import TomatoHistory from './TomatoHistory/TomatoHistory';

import './Statistics.less';

interface IStatisticsProps {
  todos: any[],
  completedTodos: any[],
  completedTodosByDay: any
}

class Statistics extends React.Component<IStatisticsProps, any> {


  public render() {
    return (
      <div className="statistics">
        <ul>
          <li>统计</li>
          <li>目标</li>
          <li>番茄历史</li>
          <li>
            任务历史
            累计完成：{this.props.completedTodos.length}个任务
            <Graph data={this.props.completedTodosByDay} totalFinishCount={this.props.completedTodos.length} width={240} height={60}/>
          </li>
        </ul>
        <TodoHistory/>
        <TomatoHistory/>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  const todos = state.todos;
  const completedTodos = getTodosByFilter(state, TODO_FILTERS.COMPLETED);
  const completedTodosByDay = groupByDay(completedTodos, 'completed_at');
  return {
    todos,
    completedTodos,
    completedTodosByDay,
    ...ownProps
  };
};

export default connect(mapStateToProps)(Statistics);