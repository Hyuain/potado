import React from 'react';
import {format, parseISO} from 'date-fns';
import './TomatoList.less'

interface ITomatoListProps {
  finishedTomatoes: any
}

const TomatoItem = (props: any) => {
  return (
    <div className="tomato-item">
      <span className="time-range">{format(parseISO(props.started_at),'HH:mm')} - {format(parseISO(props.ended_at),'HH:mm')}</span>
      <span className="description">{props.description}</span>
    </div>
  );
};

class TomatoList extends React.Component<ITomatoListProps, any> {

  get dates() {
    const dates = Object.keys(this.props.finishedTomatoes);
    return dates.sort((a, b) => Date.parse(b) - Date.parse(a)).splice(0,3);
  }

  componentDidMount(): void {
  }

  public render() {
    const list = this.dates.map(date => {
      const tomatoes = this.props.finishedTomatoes[date];
      return (
        <div key={date} className="daily-tomatoes">
          <div className="title">
            <span className="date-time">{format(new Date(date),'M月dd日')}</span>
            <span className="finished-count">完成了{tomatoes.length}个番茄</span>
          </div>
          <div className="details">
            {
              tomatoes.map((tomato:any) => (<TomatoItem key={tomato.id} {...tomato}/>))
            }
          </div>
        </div>
      );
    });
    return (
      <div className="tomato-list">
        {
          list
        }
      </div>
    );
  }
}

export default TomatoList;