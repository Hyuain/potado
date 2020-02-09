import React from 'react';
import axios from '../../../config/axios';
import {groupByLength} from '../../../utils/helpers';

import {connect} from 'react-redux';
import {getTomatoesByFilter, groupByDay} from '../../../redux/selectors';
import actions from '../../../redux/actions';
import {TOMATO_FILTERS} from '../../../constants';


import {Tabs, DatePicker, Modal, Input, Button, Popover, Pagination} from 'antd';
import './TomatoHistory.less';
import AbortedList from '../AbortedList/AbortedList';
import CompletedList from '../CompletedList/CompletedList';

const {TabPane} = Tabs;

interface ITomatoHistoryProps {
  finishedTomatoes: any[],
  finishedTomatoesByDay: any,
  abortedTomatoes: any[],
  abortedTomatoesByPage: any[],
  addTomato: (payload: any) => any,
  finishedDatesByPage: any[],
  finishedDates: any[]
}

class TomatoHistory extends React.Component<ITomatoHistoryProps, any> {

  constructor(props: ITomatoHistoryProps) {
    super(props);
    this.state = {
      addModel: false,
      startedAt: new Date(),
      description: '',
      abortedCurrent: 1,
      finishedCurrent: 1
    };
  }

  addTomato = async () => {
    if (this.state.description === '') {
      this.setState({description: '这是一个没有描述的番茄'});
    }
    const endedAt = new Date(Date.parse(this.state.startedAt._d) + 25 * 60 * 1000);
    try {
      const response = await axios.post('tomatoes', {
        started_at: this.state.startedAt,
        ended_at: endedAt,
        description: this.state.description,
        manually_created: true
      });
      this.props.addTomato(response.data.resource);
      this.setState({addModel: false});
    } catch (e) {

    }
  };

  onKeyup = (e: any) => {
    if (e.keyCode === 13) {
      this.addTomato();
    }
  };


  render() {
    const AddModel = (
      <Modal
        title="补记一个番茄"
        visible={this.state.addModel}
        onOk={this.addTomato}
        onCancel={() => this.setState({addModel: false})}
      >
        <div className="add-model-item">
          <span>番茄的开始时间：</span>
          <DatePicker
            placeholder=""
            showTime
            onOk={(value) => this.setState({startedAt: value})}
            onChange={(value) => this.setState({startedAt: value})}
          />
        </div>
        <div className="add-model-item">
          <span>番茄描述：</span>
          <Input
            type="text"
            onChange={(e) => this.setState({description: e.target.value})}
            onKeyUp={this.onKeyup}
          />
        </div>
      </Modal>
    );

    return (
      <div className="tomato-history">
        {
          AddModel
        }
        <Tabs className="tomato-history-tabs" type="card">
          <TabPane className="tomato-history-tab-pane" tab="完成的番茄" key="1">
            <Popover content="补记番茄">
              <Button onClick={() => this.setState({addModel: true})} icon="plus"/>
            </Popover>
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
  const finishedTomatoes = getTomatoesByFilter(state, TOMATO_FILTERS.FINISHED);
  const finishedTomatoesByDay = groupByDay(finishedTomatoes, 'started_at');
  const finishedDates = Object.keys(finishedTomatoesByDay).sort((a, b) => (Date.parse(b) - Date.parse(a)));
  const abortedTomatoesByPage = groupByLength(abortedTomatoes, 10);
  const finishedDatesByPage = groupByLength(finishedDates, 1);
  return {
    finishedTomatoes,
    finishedTomatoesByDay,
    abortedTomatoes,
    abortedTomatoesByPage,
    finishedDates,
    finishedDatesByPage,
    ...ownProps
  };
};

const mapDispatchToProps = {
  addTomato: actions.addTomato,
};


export default connect(mapStateToProps, mapDispatchToProps)(TomatoHistory);