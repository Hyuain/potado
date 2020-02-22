import React from 'react';
import {connect} from 'react-redux';
import {getCompletedTodos, getFinishedTomatoes} from '@/redux/selectors';
import {groupByDay} from '@/api/utils';
import HistoryGraph from '@/components/Statistics/HistoryGraph';
import HistoryDetails from '@/components/Statistics/HistoryDetails';
import './style.less';
import {RootState} from '@/redux/reducers';

interface IStatisticsState {
  currentIndex: 'tomato' | 'todo',
  graphWidth: number,
  graphHeight: number
}

interface IStatisticsProps {
}

type ReduxType = ReturnType<typeof mapStateToProps>

class Statistics extends React.Component<ReduxType, IStatisticsState> {

  constructor(props: ReduxType) {
    super(props);
    let graphWidth = (document.body.clientWidth - 32) / 2;
    let graphHeight = 70;
    if (document.body.clientWidth >= 500) {
      graphWidth = 240;
      graphHeight = 60;
    }
    this.state = {
      currentIndex: 'tomato',
      graphWidth,
      graphHeight
    };
  }

  onClick = (e: React.MouseEvent) => {
    this.setState({currentIndex: e.currentTarget.getAttribute('data-index') as 'tomato' | 'todo'});
  };

  public render() {
    const HistoryGraphs = (
      <ul>
        <li
          className={`statistics-item ${this.state.currentIndex === 'tomato' ? 'active' : ''}`}
          onClick={this.onClick}
          data-index="tomato">
          <div className="text">
            <p>番茄历史</p>
            <p>累计完成番茄</p>
            <p>{this.props.finishedTomatoes.length}</p>
          </div>
          <HistoryGraph
            data={this.props.finishedTomatoesByDay}
            totalFinishCount={this.props.finishedTomatoes.length}
            width={this.state.graphWidth} height={this.state.graphHeight}/>
        </li>
        <li
          className={`statistics-item ${this.state.currentIndex === 'todo' ? 'active' : ''}`}
          onClick={this.onClick}
          data-index="todo">
          <div className="text">
            <p>任务历史</p>
            <p>累计完成任务</p>
            <p>{this.props.completedTodos.length}</p>
          </div>
          <HistoryGraph
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
          <HistoryDetails type={this.state.currentIndex}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: IStatisticsProps) => {
  const todos = state.todos;
  const completedTodos = getCompletedTodos(state);
  const completedTodosByDay: TodosGroup = groupByDay(completedTodos, 'completed_at');
  const finishedTomatoes = getFinishedTomatoes(state);
  const finishedTomatoesByDay: TomatoesGroup = groupByDay(finishedTomatoes, 'ended_at');
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