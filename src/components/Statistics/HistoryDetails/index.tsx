import React from 'react';
import {groupByLength} from '@/api/utils';
import {connect} from 'react-redux';
import {getAbortedTomatoes, getCompletedTodos, getDeletedTodos, getFinishedTomatoes} from '@/redux/selectors';
import {groupByDay} from '@/api/utils';
import CompletedList from '@/components/Statistics/CompletedList';
import {Tabs, Pagination} from 'antd';
import {RootState} from '@/redux/reducers';
import AddTomato from '@/components/Statistics/AddTomato';

const {TabPane} = Tabs;

interface IHistoryDetailsProps {
  type: 'tomato' | 'todo'
  addTomato?: (payload: Tomato) => void,
}

interface IHistoryDetailsState {
  tomatoAbortedCurrent: number
  tomatoCompletedCurrent: number
  todoAbortedCurrent: number
  todoCompletedCurrent: number
}

type ReduxType = ReturnType<typeof mapStateToProps>

class HistoryDetails extends React.Component<ReduxType, IHistoryDetailsState> {

  constructor(props: ReduxType) {
    super(props);
    this.state = {
      tomatoAbortedCurrent: 1,
      tomatoCompletedCurrent: 1,
      todoAbortedCurrent: 1,
      todoCompletedCurrent: 1
    };
  }

  get completedDates(): string[] {
    return Object.keys(this.props.completedTodosByDay).sort((a, b) => (Date.parse(b) - Date.parse(a)));
  };

  get completedDatesByPage(): string[][] {
    return groupByLength(this.completedDates, 5);
  };

  public render() {
    const {type} = this.props;
    const tomatoData = {
      dates: this.props.finishedDatesByPage[this.state.tomatoCompletedCurrent - 1],
      tomatoesGroup: this.props.finishedTomatoesByDay
    };
    const todoData = {
      dates: this.completedDatesByPage[this.state.todoCompletedCurrent - 1],
      todosGroup: this.props.completedTodosByDay
    };
    let CompletedListWrapper: JSX.Element;
    if (type === 'tomato') {
      CompletedListWrapper = (
        <TabPane className={'tomato-history-tab-pane'} tab="完成的番茄" key="1">
          <AddTomato addTomato={this.props.addTomato}/>
          <CompletedList tomatoData={tomatoData}/>
          <Pagination
            className="pagination"
            total={this.props.finishedDates.length}
            onChange={(current: number) => {
              this.setState({tomatoCompletedCurrent: current});
            }}
            pageSize={5}
          />
        </TabPane>
      );
    } else {
      CompletedListWrapper = (
        <TabPane className={'todo-history-tab-pane'} tab="已完成的任务" key="2">
          <CompletedList todoData={todoData}/>
          <Pagination
            className="pagination"
            total={this.completedDates.length}
            onChange={(current: number) => {
              this.setState({todoCompletedCurrent: current});
            }}
            pageSize={5}
          />
        </TabPane>
      );
    }
    return (
      <div className={`${type}-history`}>
        <Tabs className={`${type}-history-tabs`} type="card">
          {
            CompletedListWrapper
          }
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: IHistoryDetailsProps) => {
  const deletedTodos = getDeletedTodos(state);
  const deletedTodosByPage: Todo[][] = groupByLength(deletedTodos, 10);
  const completedTodos = getCompletedTodos(state);
  const completedTodosByDay: TodosGroup = groupByDay(completedTodos, 'completed_at');

  const abortedTomatoes = getAbortedTomatoes(state);
  const abortedTomatoesByPage: Tomato[][] = groupByLength(abortedTomatoes, 10);
  const finishedTomatoes = getFinishedTomatoes(state);
  const finishedTomatoesByDay: TomatoesGroup = groupByDay(finishedTomatoes, 'started_at');
  const finishedDates = Object.keys(finishedTomatoesByDay).sort((a, b) => (Date.parse(b) - Date.parse(a)));
  const finishedDatesByPage: string[][] = groupByLength(finishedDates, 5);

  return {
    deletedTodos,
    deletedTodosByPage,
    completedTodosByDay,

    abortedTomatoes,
    abortedTomatoesByPage,
    finishedTomatoesByDay,
    finishedDates,
    finishedDatesByPage,
    ...ownProps
  };
};

export default connect(mapStateToProps)(HistoryDetails);