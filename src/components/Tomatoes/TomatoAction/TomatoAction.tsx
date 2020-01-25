import React from 'react';
import axios from '../../../config/axios';

import CountDown from '../CountDown/CountDown';

import {Button, Icon, Input} from 'antd';
import './TomatoAction.less';

interface ITomatoActionProps {
  startTomato: () => void,
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

  addDescription = async () => {
    try {
      const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`, {
        description: this.state.description,
        ended_at: new Date()
      });
      this.props.updateTomato(response.data.resource);
      this.setState({description: ''});
    } catch (e) {
    }
  };

  onFinish = () =>{
    this.forceUpdate();
    document.title = '番茄闹钟';
  };

  public render() {
    let html = <div/>;
    if (this.props.unfinishedTomato === undefined) {
      html = <Button className="start-button" onClick={this.props.startTomato}>开始番茄</Button>;
    } else {
      const startAt = Date.parse(this.props.unfinishedTomato.started_at);
      const duration = this.props.unfinishedTomato.duration;
      const timeNow = new Date().getTime();
      if (timeNow - startAt > duration) {
        html = (
          <div>
            <Input
              value={this.state.description}
              placeholder="请输入刚刚完成的任务"
              onChange={(e) => {
                this.setState({description: e.target.value});
              }}
              onKeyUp={this.onKeyup}
            />
            <Icon type="close-circle"/>
          </div>
        );
      } else {
        const timer = duration - timeNow + startAt;
        html = <CountDown timer={timer} onFinish={this.onFinish}/>;
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