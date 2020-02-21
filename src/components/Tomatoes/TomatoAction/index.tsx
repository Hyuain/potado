import React from 'react';
import axios from '@/api/axios';
import CountDown from '@/components/Tomatoes/CountDown';
import {Button, Icon, Input, message, Modal} from 'antd';
import './style.less';

const {confirm} = Modal;

interface ITomatoActionProps {
  addTomato: (payload: any) => {
    type: string,
    payload: any
  },
  updateTomato: (payload: any) => {
    type: string,
    payload: any
  },
  unfinishedTomato: any
}

interface ITomatoActionState {
  description: string
}

class Index extends React.Component<ITomatoActionProps, ITomatoActionState> {

  constructor(props: ITomatoActionProps) {
    super(props);
    this.state = {
      description: ''
    };
  }

  startTomato = async () => {
    try {
      const response = await axios.post('tomatoes', {duration: 25 * 60 * 1000});
      this.props.addTomato(response.data.resource);
    } catch (e) {
      message.error('网络好像有点不太好哦，一会儿再试吧');
    }
  };

  onClickCancel = () => {
    confirm({
      title: '您确定要放弃这个番茄吗？',
      okText: '确认',
      cancelText: '关闭',
      onOk: () => {
        this.abortTomato();
      }
    });
  };

  abortTomato = () => {
    this.updateTomato({
      aborted: true
    });
    document.title = 'Potado - 你的番茄土豆';
  };

  updateTomato = async (params: any) => {
    try {
      const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`, params);
      this.props.updateTomato(response.data.resource);
    } catch (e) {
      message.error('网络好像有点不太好哦，一会儿再试吧');
    }
  };

  onFinish = () => {
    this.forceUpdate();
    document.title = 'Potado - 你的番茄土豆';
  };

  onKeyUp = (e: any) => {
    if (e.keyCode === 13) {
      if (this.inputCheck()) {
        this.addDescription();
      }
    }
  };

  inputCheck = () => {
    if (this.state.description === '') {
      message.warning('还是说点儿什么吧');
      return false;
    }
    return true;
  };

  addDescription = () => {
    if (this.state.description === '') {
      this.setState({description: '这是一个没有描述的番茄'});
    }
    this.updateTomato({
      description: this.state.description,
      ended_at: new Date()
    });
    this.setState({description: ''});
  };

  public render() {
    let Html: any;
    if (this.props.unfinishedTomato === undefined) {
      Html = <Button className="start-button" onClick={this.startTomato}>开始一个番茄</Button>;
    } else {
      const startAt = Date.parse(this.props.unfinishedTomato.started_at);
      const duration = this.props.unfinishedTomato.duration;
      const timeNow = new Date().getTime();
      if (timeNow - startAt > duration) {
        Html = (
          <div className="input-wrapper">
            <Input
              value={this.state.description}
              placeholder="请输入刚刚完成的任务"
              onChange={(e) => {
                this.setState({description: e.target.value});
              }}
              onKeyUp={this.onKeyUp}
            />
            <Icon
              type="close-circle"
              className="abort"
              onClick={this.onClickCancel}
            />
          </div>
        );
      } else {
        const restTime = duration - (timeNow - startAt);
        Html = (
          <div className="count-down-wrapper">
            <CountDown
              restTime={restTime}
              duration={duration}
              onFinish={this.onFinish}
            />
            <Icon
              type="close-circle"
              className="abort"
              onClick={this.onClickCancel}
            />
          </div>
        );
      }
    }
    return (
      <div className="tomato-action">
        {Html}
      </div>
    );
  }
}

export default Index;