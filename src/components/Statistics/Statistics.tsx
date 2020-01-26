import React from 'react';
import _ from 'lodash';
import {format, parseISO} from 'date-fns';

import {connect} from 'react-redux';
import {TODO_FILTERS} from '../../constants';
import {getTodosByFilter} from '../../redux/selectors';

import Graph from './Graph/Graph';

import './Statistics.less';

interface IStatisticsProps {
  todos: any[],
  completedTodos: any[],
  completedTodosByGroup: any
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
            <Graph data={this.props.completedTodosByGroup} totalFinishCount={this.props.completedTodos.length} width={240} height={60}/>
          </li>
        </ul>
      </div>
    );
  }
}


const mapStateToProps = (state: any, ownProps: any) => {
  const todos = state.todos;
  const completedTodos = getTodosByFilter(state, TODO_FILTERS.COMPLETED);
  const completedTodosByGroup = _.groupBy(completedTodos, (todo) => {
    return (format(parseISO(todo.updated_at), 'yyyy-MM-dd'));
  });
  return {
    todos,
    completedTodos,
    completedTodosByGroup,
    ...ownProps
  };
};


export default connect(mapStateToProps)(Statistics);