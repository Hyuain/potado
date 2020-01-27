import React from 'react';

import {connect} from 'react-redux';
import {TODO_FILTERS, TOMATO_FILTERS} from '../../constants';
import {getTodosByFilter, getTomatoesByFilter, groupByDay} from '../../redux/selectors';

import Graph from './Graph/Graph';
import TodoHistory from './TodoHistory/TodoHistory';
import TomatoHistory from './TomatoHistory/TomatoHistory';

import './Statistics.less';

interface IStatisticsProps {
  todos: any[],
  completedTodos: any[],
  completedTodosByDay: any,
  finishedTomatoes: any[],
  finishedTomatoesByDay: any
}

class Statistics extends React.Component<IStatisticsProps, any> {

  private myRef: any;

  constructor(props: IStatisticsProps) {
    super(props);
    this.state = {
      currentIndex: '1'
    };
  }

  onClick = (e: any) => {
    this.setState({currentIndex: e.currentTarget.getAttribute('data-index')});
  };

  public render() {

    let DetailStatistics = null;
    switch (this.state.currentIndex) {
      case '1':
        DetailStatistics = <TomatoHistory/>;
        break;
      case '2':
        DetailStatistics = <TodoHistory/>;
    }

    return (
      <div className="statistics">
        <ul>
          <li
            className={`statistics-item ${this.state.currentIndex === '1' ? 'active' : ''}`}
            onClick={this.onClick}
            data-index="1">
            <div className="text">
              <p>番茄历史</p>
              <p>累计完成番茄</p>
              <p>{this.props.finishedTomatoes.length}</p>
            </div>
            <Graph
              data={this.props.finishedTomatoesByDay}
              totalFinishCount={this.props.finishedTomatoes.length}
              width={240} height={60}/>
          </li>
          <li
            className={`statistics-item ${this.state.currentIndex === '2' ? 'active' : ''}`}
            onClick={this.onClick}
            data-index="2">
            <div className="text">
              <p>任务历史</p>
              <p>累计完成任务</p>
              <p>{this.props.completedTodos.length}</p>
            </div>
            <Graph
              data={this.props.completedTodosByDay}
              totalFinishCount={this.props.completedTodos.length} width={240}
              height={60}/>
          </li>
        </ul>
        <div className="detail-statistics">
          {DetailStatistics}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  const todos = state.todos;
  const completedTodos = getTodosByFilter(state, TODO_FILTERS.COMPLETED);
  const completedTodosByDay = groupByDay(completedTodos, 'completed_at');
  const finishedTomatoes = getTomatoesByFilter(state, TOMATO_FILTERS.FINISHED);
  const finishedTomatoesByDay = groupByDay(finishedTomatoes, 'ended_at');
  return {
    todos,
    completedTodos,
    completedTodosByDay,
    finishedTomatoes,
    finishedTomatoesByDay,
    ...ownProps
  };
};

export default connect(mapStateToProps)(Statistics);