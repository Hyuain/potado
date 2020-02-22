import React from 'react';
import axios from '@/api/axios';
import {getFriendlyDate} from '@/api/utils';
import moment from 'moment';
import {connect} from 'react-redux';
import actions from '@/redux/actions';
import {Dispatch} from 'redux';
import {RootState} from '@/redux/reducers';
import {message} from 'antd';
import './style.less';

interface ITomatoHistoryItemProps {
  type: 'finished' | 'aborted',
  tomato: Tomato,
}

interface ITomatoHistoryItemState {
  editing: boolean
  textContent: string
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

class TomatoHistoryItem extends React.Component<ReduxType, ITomatoHistoryItemState> {

  constructor(props: ReduxType) {
    super(props);
    this.state = {
      editing: false,
      textContent: this.props.tomato.description || '这是一个没有描述的番茄'
    };
  }

  updateTomato = async (params: TomatoUpdateParams) => {
    try {
      const response = await axios.put<TomatoUpdateResponse>(`tomatoes/${this.props.tomato.id}`, params);
      this.props.updateTomato(response.data.resource);
    } catch (e) {
      message.error('网络好像有点不太好哦，一会儿再试吧');
    }
  };

  submitChange = () => {
    this.updateTomato({description: this.state.textContent});
    this.setState({editing: false});
  };

  onKeyup = (e: React.KeyboardEvent) => {
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
          {moment(this.props.tomato.started_at).format('HH:mm')} -
          {moment(this.props.tomato.ended_at).format('HH:mm')}
        </span>)
      ;
    } else if (this.props.type === 'aborted') {
      Time = (<span className="time">{getFriendlyDate(this.props.tomato.started_at, 'monthAndDay')}</span>);
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
        <div className={`tomato-history-item ${this.state.editing ? 'editing' : ''}`}>
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

const mapStateToProps = (state: RootState, ownProps: ITomatoHistoryItemProps) => ({
  ...ownProps
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateTomato(payload: Tomato) {
      dispatch(actions.updateTomato(payload));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TomatoHistoryItem);