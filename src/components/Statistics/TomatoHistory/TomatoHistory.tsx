import React from 'react';
import {connect} from 'react-redux';
import {getTomatoesByFilter, groupByDay} from '../../../redux/selectors';
import {TOMATO_FILTERS} from '../../../constants';
import {format, parseISO} from 'date-fns';
import TomatoHistoryItem from '../TomatoHistoryItem/TomatoHistoryItem';
import {Tabs} from 'antd';
import './TomatoHistory.less'
const {TabPane} = Tabs;

interface ITomatoHistoryProps {
  tomatoes: any[],
  finishedTomatoes: any[],
  finishedTomatoesByDay: any,
  abortedTomatoes: any[]
}

class TomatoHistory extends React.Component<ITomatoHistoryProps, any> {

  get finishedDates() {
    const dates = Object.keys(this.props.finishedTomatoesByDay);
    return dates.sort((a, b) => (Date.parse(b) - Date.parse(a)));
  }

  getFriendlyTime = (time: number) => {
    const seconds = Math.floor(time / 1000);
    if (seconds < 60) return `${seconds}秒`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}分钟`;
    const hours = Math.floor(minutes / 60);
    return `${hours}小时${Math.floor(minutes % 60)}分钟`;
  };

  render() {
    const finishedList = this.finishedDates.map((date) => {
      const tomatoes = this.props.finishedTomatoesByDay[date];
      const totalTime = tomatoes.reduce((totalTime: number, tomato: any) => {
        return totalTime + Date.parse(tomato.ended_at) - Date.parse(tomato.started_at);
      }, 0);
      return (
        <div key={date} className="daily-tomatoes">
          <div className="title">
            <p className="date">
              <span className="date-time">{format(parseISO(date), 'M月dd日')}</span>
              <span className="week-time">周五</span>
            </p>
            <p className="finished-count">完成了 {tomatoes.length} 个番茄</p>
            <p className="total-time">总计{this.getFriendlyTime(totalTime)}</p>
          </div>
          <div className="details">
            {
              tomatoes.map((tomato: any) => (<TomatoHistoryItem key={tomato.id} tomato={tomato} type="finished"/>))
            }
          </div>
        </div>
      );
    });

    console.log(this.props.abortedTomatoes);
    const abortedList = this.props.abortedTomatoes.map((tomato) => {
      return (
        <div key={tomato.id}>
          <TomatoHistoryItem key={tomato.id} tomato={tomato} type="aborted"/>
        </div>
      );
    });
    return (
      <div className="tomato-history">
        <Tabs className="tomato-history-tabs" type="card">
          <TabPane className="tomato-history-tab-pane" tab="完成的番茄" key="1">
            {
              finishedList
            }
          </TabPane>
          <TabPane className="tomato-history-tab-pane" tab="被打断的番茄" key="2">
            {
              abortedList
            }
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  const tomatoes = state.todos;
  const finishedTomatoes = getTomatoesByFilter(state, TOMATO_FILTERS.FINISHED);
  const abortedTomatoes = getTomatoesByFilter(state, TOMATO_FILTERS.ABORTED);
  const finishedTomatoesByDay = groupByDay(finishedTomatoes, 'started_at');

  return {
    tomatoes,
    finishedTomatoes,
    finishedTomatoesByDay,
    abortedTomatoes,
    ...ownProps
  };
};

export default connect(mapStateToProps)(TomatoHistory);