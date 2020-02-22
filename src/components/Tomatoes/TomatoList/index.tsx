import React from 'react';
import moment from 'moment';
import './style.less';

const TomatoItem = (props: Tomato) => {
  return (
    <div className="tomato-item">
      <span
        className="time-range">{moment(props.started_at).format('HH:mm')} - {moment(props.ended_at).format('HH:mm')}</span>
      <span className="description">{props.description}</span>
    </div>
  );
};

interface ITomatoListProps {
  finishedTomatoes: TomatoesGroup
}

class TomatoList extends React.Component<ITomatoListProps> {

  get dates() {
    const dates = Object.keys(this.props.finishedTomatoes);
    return dates.sort((a, b) => Date.parse(b) - Date.parse(a)).splice(0, 3);
  }

  public render() {
    const List = this.dates.map(date => {
      const tomatoes = this.props.finishedTomatoes[date];
      const Title = (
        <div className="title">
          <span className="date-time">{moment(date).format('M月D日')}</span>
          <span className="finished-count">完成了 {tomatoes.length} 个番茄</span>
        </div>
      );
      const Details = (
        <div className="details">
          {tomatoes.map((tomato: Tomato) => (<TomatoItem key={tomato.id} {...tomato}/>))}
        </div>
      );
      return (
        <div key={date} className="daily-tomatoes">
          {
            Title
          }
          {
            Details
          }
        </div>
      );
    });

    return (
      <div className="tomato-list">
        {
          List
        }
      </div>
    );
  }
}

export default TomatoList;