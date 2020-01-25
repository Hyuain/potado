import React from 'react';
import axios from '../../../config/axios';

import CountDown from '../CountDown/CountDown';

import {Button, Icon, Input, Modal} from 'antd';
import './TomatoAction.less';

const {confirm} = Modal;

interface ITomatoActionProps {
  addTomato: (payload: any) => any,
  updateTomato: (payload: any) => any,
  unfinishedTomato: any
}

interface ITomatoActionState {
  description: string
}

class TomatoAction extends React.Component<ITomatoActionProps, ITomatoActionState> {

  constructor(props: ITomatoActionProps) {
    super(props);
    this.state = {
      description: ''
    };
  }

  onKeyup = (e: any) => {
    if (e.keyCode === 13 && this.state.description !== '') {
      this.addDescription();
    }
  };

  startTomato = async () => {
    try {
      const response = await axios.post('tomatoes', {duration: 10 * 60 * 1000});
      this.props.addTomato(response.data.resource);
    } catch (e) {

    }
  };

  updateTomato = async (params: any) => {
    try {
      const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`, params);
      this.props.updateTomato(response.data.resource);
    } catch (e) {
    }
  };

  abortTomato = () => {
    this.updateTomato({
      aborted: true
    });
    document.title = 'Potado - 你的番茄土豆';
  };

  showConfirm = () => {
    confirm({
      title: '您确定要放弃这个番茄吗？',
      okText: '确认',
      cancelText: '关闭',
      onOk: () => {
        this.abortTomato();
      },
      onCancel() {

      }
    });
  };

  onFinish = () => {
    this.forceUpdate();
    document.title = 'Potado - 你的番茄土豆';
  };

  addDescription = () => {
    this.updateTomato({
      description: this.state.description,
      ended_at: new Date()
    });
    this.setState({description: ''});
  };

  public render() {
    let html = <div/>;
    if (this.props.unfinishedTomato === undefined) {
      html = <Button className="start-button" onClick={this.startTomato}>开始一个番茄</Button>;
    } else {
      const startAt = Date.parse(this.props.unfinishedTomato.started_at);
      const duration = this.props.unfinishedTomato.duration;
      const timeNow = new Date().getTime();
      if (timeNow - startAt > duration) {
        html = (
          <div className="input-wrapper">
            <Input
              value={this.state.description}
              placeholder="请输入刚刚完成的任务"
              onChange={(e) => {
                this.setState({description: e.target.value});
              }}
              onKeyUp={this.onKeyup}
            />
            <Icon
              type="close-circle"
              className="abort"
              onClick={this.showConfirm}
            />
          </div>
        );
      } else {
        const wholeTime = duration - timeNow + startAt;
        html = (
          <div className="count-down-wrapper">
            <CountDown
              wholeTime={wholeTime}
              duration={duration}
              onFinish={this.onFinish}
            />
            <Icon
              type="close-circle"
              className="abort"
              onClick={this.showConfirm}
            />
          </div>
        );
      }
    }
    return (
      <div className="tomato-action">
        {html}
      </div>
    );
  }
}

export default TomatoAction;