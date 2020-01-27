import React from 'react';
import axios from '../../../config/axios';
import {format, parseISO} from 'date-fns';

import {connect} from 'react-redux';
import actions from '../../../redux/actions';

import './TomatoHistoryItem.less';

interface ITomatoHistoryItemProps {
  type: string,
  tomato: any,
  updateTomato: (payload: any) => any,
}

class TomatoHistoryItem extends React.Component<ITomatoHistoryItemProps, any> {

  constructor(props: ITomatoHistoryItemProps) {
    super(props);
    this.state = {
      editing: false,
      textContent: this.props.tomato.description || '这是一个没有描述的番茄'
    };
  }

  updateTomato = async (params: any) => {
    try {
      const response = await axios.put(`tomatoes/${this.props.tomato.id}`, params);
      this.props.updateTomato(response.data.resource);
    } catch (e) {

    }
  };

  submitChange = () => {
    this.updateTomato({description: this.state.textContent});
    this.setState({editing: false});
  };

  onKeyup = (e: any) => {
    if (e.keyCode === 13 && this.state.textContent !== '') {
      this.submitChange();
    }
  };

  render() {

    const EditField = (
      <div className="edit-filed">
        <input type="text"
               value={this.state.textContent}
               onChange={(e) => {
                 this.setState({textContent: e.target.value});
               }}
               onKeyUp={this.onKeyup}
        />
      </div>
    );

    const Description = (
      <span className="description">
        {this.props.tomato.description || '这是一个没有描述的番茄'}
      </span>
    );

    let Time = null;
    if (this.props.type === 'finished') {
      Time = (
        <span className="time">
          {format(parseISO(this.props.tomato.started_at), 'HH:mm')} -
          {format(parseISO(this.props.tomato.ended_at), 'HH:mm')}
        </span>)
      ;
    } else if (this.props.type === 'aborted') {
      Time = (<span className="time">{format(parseISO(this.props.tomato.started_at), 'M月dd日')}</span>);
    }

    let Action = null;
    if (this.state.editing) {
      Action = (
        <div className="action">
          <span onClick={() => this.submitChange()}>提交</span>
          <span onClick={() => this.setState({editing: false})}>取消</span>
        </div>
      );
    } else {
      if (this.props.type === 'finished') {
        Action = (
          <div className="action">
            <span onClick={() => this.setState({editing: true})}>编辑</span>
            <span onClick={() => this.updateTomato({aborted: true})}>删除</span>
          </div>
        );
      } else if (this.props.type === 'aborted') {
        Action = (
          <div className="action">
            <span onClick={() => this.setState({editing: true})}>编辑</span>
          </div>
        );
      }
    }


    return (
      <div>
        <div className={`tomato-history-item ${this.state.editing ? 'editing' : '' }`}>
          <div className="text">
            {
              Time
            }
            {
              this.state.editing ? EditField : Description
            }
          </div>
          {
            Action
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
});

const mapDispatchToProps = {
  updateTomato: actions.updateTomato
};

export default connect(mapStateToProps, mapDispatchToProps)(TomatoHistoryItem);