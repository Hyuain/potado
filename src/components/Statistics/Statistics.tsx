import React from 'react';

import {connect} from 'react-redux';
import {TODO_FILTERS, TOMATO_FILTERS} from '../../constants';
import {getTodosByFilter, getTomatoesByFilter, groupByDay} from '../../redux/selectors';

import Graph from './Graph/Graph';
import TodoHistory from './TodoHistory/TodoHistory';
import TomatoHistory from './TomatoHistory/TomatoHistory';

import './Statistics.less';

interface IStatisticsState {
  currentIndex: string,
  graphWidth: number,
  graphHeight: number
}

interface IStatisticsProps {
  todos: any[],
  completedTodos: any[],
  completedTodosByDay: any,
  finishedTomatoes: any[],
  finishedTomatoesByDay: any
}

class Statistics extends React.Component<IStatisticsProps, IStatisticsState> {

  constructor(props: IStatisticsProps) {
    super(props);
    let graphWidth = (document.body.clientWidth - 32) / 2;
    let graphHeight = 70;
    if (document.body.clientWidth >= 500) {
      graphWidth = 240;
      graphHeight = 60;
    }
    this.state = {
      currentIndex: '1',
      graphWidth,
      graphHeight
    };
  }

  onClick = (e: any) => {
    this.setState({currentIndex: e.currentTarget.getAttribute('data-index')});
  };

  public render() {

    let HistoryDetails: any;
    switch (this.state.currentIndex) {
      case '1':
        HistoryDetails = <TomatoHistory/>;
        break;
      case '2':
        HistoryDetails = <TodoHistory/>;
    }

    const HistoryGraphs = (
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
            width={this.state.graphWidth} height={this.state.graphHeight}/>
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
            totalFinishCount={this.props.completedTodos.length}
            width={this.state.graphWidth} height={this.state.graphHeight}/>
        </li>
      </ul>
    );

    return (
      <div className="statistics">
        {
          HistoryGraphs
        }
        <div className="history-details">
          {
            HistoryDetails
          }
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