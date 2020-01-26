import React from 'react';
import {format, parseISO} from 'date-fns';
import './TomatoHistoryItem.less'

interface ITomatoHistoryItemProps {
  type: string,
  tomato: any
}

class TomatoHistoryItem extends React.Component<ITomatoHistoryItemProps, any> {
  render() {
    let time = null;
    if (this.props.type === 'finished') {
      time = (<span
        className="time">{format(parseISO(this.props.tomato.started_at), 'HH:mm')} - {format(parseISO(this.props.tomato.ended_at), 'HH:mm')}</span>);
    } else if (this.props.type === 'aborted') {
      time = (<span className="time">{format(parseISO(this.props.tomato.started_at), 'M月dd日')}</span>);
    }

    let action = null;
    if (this.props.type === 'finished') {
      action = (
        <div className="action">
          <span>编辑</span>
          <span>删除</span>
        </div>
      );
    } else if (this.props.type === 'aborted') {
      action = (
        <div className="action">
          <span>编辑</span>
        </div>
      );
    }
    return (
      <div>
        <div className="tomato-history-item">
          <div className="text">
            {
              time
            }
            <span className="description">
              {this.props.tomato.description || `这是一个没有描述的番茄`}
            </span>
          </div>
          {
            action
          }

        </div>
      </div>
    );
  }
}

export default TomatoHistoryItem;