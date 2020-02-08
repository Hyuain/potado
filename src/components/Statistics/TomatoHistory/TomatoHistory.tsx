import React from 'react';
import axios from '../../../config/axios';
import {getFriendlyDate, groupByLength} from '../../../utils/helpers';

import {connect} from 'react-redux';
import {getTomatoesByFilter, groupByDay} from '../../../redux/selectors';
import actions from '../../../redux/actions';
import {TOMATO_FILTERS} from '../../../constants';

import TomatoHistoryItem from '../TomatoHistoryItem/TomatoHistoryItem';

import {Tabs, DatePicker, Modal, Input, Button, Popover, Pagination} from 'antd';
import './TomatoHistory.less';

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

const FinishedList = (props: any) => {
  const getFriendlyTime = (time: number) => {
    const seconds = Math.floor(time / 1000);
    if (seconds < 60) return `${seconds} 秒`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} 分钟`;
    const hours = Math.floor(minutes / 60);
    return `${hours} 小时 ${Math.floor(minutes % 60)} 分钟`;
  };
  if (props.dates) {
    return (
      props.dates.map((date: string) => {
        const tomatoes = props.tomatoes[date];
        const totalTime = tomatoes.reduce((totalTime: number, tomato: any) => {
          return totalTime + Date.parse(tomato.ended_at) - Date.parse(tomato.started_at);
        }, 0);
        return (
          <div key={date} className="daily-tomatoes">
            <div className="title">
              <p className="date">
                <span className="date-time">{getFriendlyDate(date, 'monthAndDay')}</span>
                <span className="week-time">{getFriendlyDate(date, 'dayOfWeek')}</span>
              </p>
              <p className="finished-count">完成了 {tomatoes.length} 个番茄</p>
              <p className="total-time">总计 {getFriendlyTime(totalTime)}</p>
            </div>
            <div className="details">
              {
                tomatoes.map((tomato: any) => (<TomatoHistoryItem key={tomato.id} tomato={tomato} type="finished"/>))
              }
            </div>
          </div>
        );
      })
    );
  } else {
    return (<div></div>);

  }
  // this.finishedDates.map((date) => {
  //   const tomatoes = this.props.finishedTomatoesByDay[date];
  //   const totalTime = tomatoes.reduce((totalTime: number, tomato: any) => {
  //     return totalTime + Date.parse(tomato.ended_at) - Date.parse(tomato.started_at);
  //   }, 0);
  //   return (
  //     <div key={date} className="daily-tomatoes">
  //       <div className="title">
  //         <p className="date">
  //           <span className="date-time">{getFriendlyDate(date, 'monthAndDay')}</span>
  //           <span className="week-time">{getFriendlyDate(date, 'dayOfWeek')}</span>
  //         </p>
  //         <p className="finished-count">完成了 {tomatoes.length} 个番茄</p>
  //         <p className="total-time">总计{this.getFriendlyTime(totalTime)}</p>
  //       </div>
  //       <div className="details">
  //         {
  //           tomatoes.map((tomato: any) => (<TomatoHistoryItem key={tomato.id} tomato={tomato} type="finished"/>))
  //         }
  //       </div>
  //     </div>
  //   );
  // });
};

const AbortedList = (props: any) => {
  return (
    props.tomatoes.map((tomato: any) => (
      <div key={tomato.id}>
        <TomatoHistoryItem key={tomato.id} tomato={tomato} type="aborted"/>
      </div>
    ))
  );
};

class TomatoHistory extends React.Component<ITomatoHistoryProps, any> {

  constructor(props: ITomatoHistoryProps) {
    super(props);
    this.state = {
      addModel: false,
      startedAt: new Date(),
      description: '',
      abortedTomatoesEachPage: props.abortedTomatoesByPage[0],
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
            <FinishedList dates={this.props.finishedDatesByPage[this.state.finishedCurrent - 1]}
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