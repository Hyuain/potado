import React from 'react';
import {groupByLength} from '@/api/utils';
import {connect} from 'react-redux';
import {getAbortedTomatoes, getCompletedTodos, getDeletedTodos, getFinishedTomatoes} from '@/redux/selectors';
import {groupByDay} from '@/api/utils';
import CompletedList from '@/components/Statistics/CompletedList';
import AbortedList from '@/components/Statistics/AbortedList';
import {Tabs, Pagination} from 'antd';
import {RootState} from '@/redux/reducers';
import AddTomato from '@/components/Statistics/AddTomato';
import './sytle.less'

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

  get completedTodosDates(): string[] {
    return Object.keys(this.props.completedTodosByDay).sort((a, b) => (Date.parse(b) - Date.parse(a)));
  };

  get completedTodosDatesByPage(): string[][] {
    return groupByLength(this.completedTodosDates, 5);
  };

  get finishedTomatoesDates(): string[] {
    return Object.keys(this.props.finishedTomatoesByDay).sort((a, b) => (Date.parse(b) - Date.parse(a)));
  }

  get finishedTomatoesDatesByPage(): string[][] {
    return groupByLength(this.finishedTomatoesDates, 5);
  }

  public render() {
    const {type} = this.props;
    const tomatoData = {
      dates: this.finishedTomatoesDatesByPage[this.state.tomatoCompletedCurrent - 1],
      tomatoesGroup: this.props.finishedTomatoesByDay
    };
    const todoData = {
      dates: this.completedTodosDatesByPage[this.state.todoCompletedCurrent - 1],
      todosGroup: this.props.completedTodosByDay
    };
    let CompletedListWrapper: JSX.Element;
    let AbortedListWrapper: JSX.Element;
    if (type === 'tomato') {
      CompletedListWrapper = (
        <TabPane className={'tomato-history-tab-pane'} tab="完成的番茄" key="completedTomato">
          <AddTomato addTomato={this.props.addTomato}/>
          <CompletedList tomatoData={tomatoData}/>
          <Pagination
            className="pagination"
            total={this.finishedTomatoesDatesByPage.length}
            current={this.state.tomatoCompletedCurrent}
            onChange={(current: number) => {
              this.setState({tomatoCompletedCurrent: current});
            }}
            pageSize={5}
          />
        </TabPane>
      );
      AbortedListWrapper = (
        <TabPane className="tomato-history-tab-pane" tab="被打断的番茄" key="abortedTomato">
          <AbortedList tomatoes={this.props.abortedTomatoesByPage[this.state.tomatoAbortedCurrent - 1]}/>
          <Pagination
            className="pagination"
            total={this.props.abortedTomatoes.length}
            current={this.state.tomatoAbortedCurrent}
            onChange={(current: number) => {
              this.setState({tomatoAbortedCurrent: current});
            }}
            pageSize={10}
          />
        </TabPane>
      );
    } else {
      CompletedListWrapper = (
        <TabPane className={'todo-history-tab-pane'} tab="已完成的任务" key="completedTodo">
          <CompletedList todoData={todoData}/>
          <Pagination
            className="pagination"
            total={this.completedTodosDates.length}
            current={this.state.todoCompletedCurrent}
            onChange={(current: number) => {
              this.setState({todoCompletedCurrent: current});
            }}
            pageSize={5}
          />
        </TabPane>
      );
      AbortedListWrapper = (
        <TabPane className="todo-history-tab-pane" tab="已删除的任务" key="abortedTodo">
          <AbortedList todos={this.props.deletedTodosByPage[this.state.todoAbortedCurrent - 1]}></AbortedList>
          <Pagination
            className="pagination"
            total={this.props.deletedTodos.length}
            current={this.state.todoAbortedCurrent}
            onChange={(current: number) => {
              this.setState({todoAbortedCurrent: current});
            }}
            pageSize={10}
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
          {
            AbortedListWrapper
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

  return {
    deletedTodos,
    deletedTodosByPage,
    completedTodosByDay,
    abortedTomatoes,
    abortedTomatoesByPage,
    finishedTomatoesByDay,
    ...ownProps
  };
};

export default connect(mapStateToProps)(HistoryDetails);