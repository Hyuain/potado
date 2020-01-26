import React from 'react';
import {connect} from 'react-redux';
import {TODO_FILTERS} from '../../constants';
import {getTodosByFilter} from '../../redux/selectors';

import './Statistics.less';

interface IStatisticsProps {
  todos: any[],
  completedTodos: any[]
}

class Statistics extends React.Component<IStatisticsProps, any> {


  public render() {
    console.log(this.props);
    return (
      <div className="statistics">
        <ul>
          <li>统计</li>
          <li>目标</li>
          <li>番茄历史</li>
          <li>
            任务历史
            累计完成：{this.props.completedTodos.length}个任务
          </li>
        </ul>
      </div>
    );
  }
}


const mapStateToProps = (state: any) => {
  const todos = state.todos;
  const completedTodos = getTodosByFilter(state, TODO_FILTERS.COMPLETED);
  return {
    todos,
    completedTodos
  };
};


export default connect(mapStateToProps)(Statistics);