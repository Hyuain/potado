import React from 'react';
import {groupByLength} from '../../../utils/helpers';

import {connect} from 'react-redux';
import actions from '../../../redux/actions';
import {getTomatoesByFilter, groupByDay} from '../../../redux/selectors';
import {TOMATO_FILTERS} from '../../../constants';

import AbortedList from '../AbortedList/AbortedList';
import CompletedList from '../CompletedList/CompletedList';
import AddTomato from '../AddTomato/AddTomato';

import {Tabs, Pagination} from 'antd';
import './TomatoHistory.less';

const {TabPane} = Tabs;

interface ITomatoHistoryProps {
  finishedTomatoesByDay: any[],
  abortedTomatoes: any[],
  abortedTomatoesByPage: any[],
  addTomato: (payload: any) => any,
  finishedDatesByPage: any[],
  finishedDates: any[]
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
              pageSize={1}
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

const mapStateToProps = (state: any, ownProps: any) => {
  const abortedTomatoes = getTomatoesByFilter(state, TOMATO_FILTERS.ABORTED);
  const abortedTomatoesByPage = groupByLength(abortedTomatoes, 10);
  const finishedTomatoes = getTomatoesByFilter(state, TOMATO_FILTERS.FINISHED);
  const finishedTomatoesByDay = groupByDay(finishedTomatoes, 'started_at');
  const finishedDates = Object.keys(finishedTomatoesByDay).sort((a, b) => (Date.parse(b) - Date.parse(a)));
  const finishedDatesByPage = groupByLength(finishedDates, 1);
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