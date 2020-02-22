import React from 'react';
import {groupByLength} from '@/api/utils';
import {connect} from 'react-redux';
import {getCompletedTodos, getDeletedTodos} from '@/redux/selectors';
import {groupByDay} from '@/api/utils';
import AbortedList from '@/components/Statistics/AbortedList';
import CompletedList from '@/components/Statistics/CompletedList';
import {Tabs, Pagination} from 'antd';
import './style.less';
import {RootState} from '@/redux/reducers';

const {TabPane} = Tabs;

interface ITodoHistoryProps {
}

interface ITodoHistoryState {
  deletedCurrent: number,
  completedCurrent: number
}

type ReduxType = ReturnType<typeof mapStateToProps>

class TodoHistory extends React.Component<ReduxType, ITodoHistoryState> {

  constructor(props: ReduxType) {
    super(props);
    this.state = {
      deletedCurrent: 1,
      completedCurrent: 1
    };
  }

  get completedDates(): string[] {
    return Object.keys(this.props.completedTodosByDay).sort((a, b) => (Date.parse(b) - Date.parse(a)));
  };

  get completedDatesByPage(): string[][] {
    return groupByLength(this.completedDates, 5);
  };

  public render() {
    return (
      <div className="todo-history">
        <Tabs className="todo-history-tabs" type="card">

          <TabPane className="todo-history-tab-pane" tab="已完成的任务" key="1">
            <CompletedList dates={this.completedDatesByPage[this.state.completedCurrent - 1]}
                           todos={this.props.completedTodosByDay}></CompletedList>
            <Pagination
              className="pagination"
              total={this.completedDates.length}
              onChange={(current: number) => {
                this.setState({completedCurrent: current});
              }}
              pageSize={5}
            />
          </TabPane>

          <TabPane className="todo-history-tab-pane" tab="已删除的任务" key="2">
            <AbortedList todos={this.props.deletedTodosByPage[this.state.deletedCurrent - 1]}></AbortedList>
            <Pagination
              className="pagination"
              total={this.props.deletedTodos.length}
              onChange={(current: number) => {
                this.setState({deletedCurrent: current});
              }}
              pageSize={10}
            />
          </TabPane>

        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: ITodoHistoryProps) => {
  const deletedTodos = getDeletedTodos(state);
  const deletedTodosByPage: Todo[][] = groupByLength(deletedTodos, 10);
  const completedTodos = getCompletedTodos(state);
  const completedTodosByDay: TodosGroup = groupByDay(completedTodos, 'completed_at');

  return {
    deletedTodos,
    deletedTodosByPage,
    completedTodosByDay,
    ...ownProps
  };
};

export default connect(mapStateToProps)(TodoHistory);