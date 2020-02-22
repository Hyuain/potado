import React from 'react';
import {groupByLength} from '@/api/utils';
import {connect} from 'react-redux';
import actions from '@/redux/actions';
import {getAbortedTomatoes, getFinishedTomatoes, getTomatoesByFilter} from '@/redux/selectors';
import {groupByDay} from '@/api/utils';
import {TOMATO_FILTERS} from '@/constants';
import AbortedList from '@/components/Statistics/AbortedList';
import CompletedList from '@/components/Statistics/CompletedList';
import AddTomato from '@/components/Statistics/AddTomato';
import {Tabs, Pagination} from 'antd';
import './style.less';
import {RootState} from '@/redux/reducers';

const {TabPane} = Tabs;

interface ITomatoHistoryProps {
  abortedTomatoes: any[],
  abortedTomatoesByPage: any[],
  finishedTomatoesByDay: any[],
  finishedDates: any[],
  finishedDatesByPage: any[],
  addTomato: (payload: any) => any,
}

interface ITomatoHistoryState {
  abortedCurrent: number,
  finishedCurrent: number
}

class TomatoHistory extends React.Component<ITomatoHistoryProps, ITomatoHistoryState> {

  constructor(props: ITomatoHistoryProps) {
    super(props);
    this.state = {
      abortedCurrent: 1,
      finishedCurrent: 1
    };
  }

  render() {
    return (
      <div className="tomato-history">
        <Tabs className="tomato-history-tabs" type="card">

          <TabPane className="tomato-history-tab-pane" tab="完成的番茄" key="1">
            <AddTomato addTomato={this.props.addTomato}/>
            <CompletedList dates={this.props.finishedDatesByPage[this.state.finishedCurrent - 1]}
                           tomatoes={this.props.finishedTomatoesByDay}/>
            <Pagination
              className="pagination"
              total={this.props.finishedDates.length}
              onChange={(current: number) => {
                this.setState({finishedCurrent: current});
              }}
              pageSize={5}
            />
          </TabPane>

          <TabPane className="tomato-history-tab-pane" tab="被打断的番茄" key="2">
            <AbortedList tomatoes={this.props.abortedTomatoesByPage[this.state.abortedCurrent - 1]}/>
            <Pagination
              className="pagination"
              total={this.props.abortedTomatoes.length}
              onChange={(current: number) => {
                this.setState({abortedCurrent: current});
              }}
              pageSize={10}
            />
          </TabPane>

        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: any) => {
  const abortedTomatoes = getAbortedTomatoes(state);
  const abortedTomatoesByPage = groupByLength(abortedTomatoes, 10);
  const finishedTomatoes = getFinishedTomatoes(state);
  const finishedTomatoesByDay = groupByDay(finishedTomatoes, 'started_at');
  const finishedDates = Object.keys(finishedTomatoesByDay).sort((a, b) => (Date.parse(b) - Date.parse(a)));
  const finishedDatesByPage = groupByLength(finishedDates, 5);
  return {
    abortedTomatoes,
    abortedTomatoesByPage,
    finishedTomatoesByDay,
    finishedDates,
    finishedDatesByPage,
    ...ownProps
  };
};

const mapDispatchToProps = {
  addTomato: actions.addTomato,
};

export default connect(mapStateToProps, mapDispatchToProps)(TomatoHistory);