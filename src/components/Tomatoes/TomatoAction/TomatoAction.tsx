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

const TomatoAction = (props: ITomatoActionProps) => {

  const [description, setDescription] = React.useState<string>('');

  let html = <div/>;

  const onKeyup = (e: any) => {
    if (e.keyCode === 13 && description !== '') {
      addDescription();
    }
  };

  const addDescription = async () => {
    try {
      const response = await axios.put(`tomatoes/${props.unfinishedTomato.id}`, {
        description,
        ended_at: new Date()
      });
      props.updateTomato(response.data.resource);
      setDescription('');
      console.log(response);
    } catch (e) {

    }
  };

  if (props.unfinishedTomato === undefined) {
    html = <Button className="start-button" onClick={props.startTomato}>开始番茄</Button>;
  } else {
    const startAt = Date.parse(props.unfinishedTomato.started_at);
    const duration = props.unfinishedTomato.duration;
    const timeNow = new Date().getTime();
    if (timeNow - startAt > duration) {
      html = (
        <div>
          <Input
            value={description}
            placeholder="请输入刚刚完成的任务"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            onKeyUp={onKeyup}
          />
          <Icon type="close-circle"/>
        </div>
      );
    } else {
      const timer = duration - timeNow + startAt;
      html = <CountDown timer={timer}/>;
    }
  }


  return (
    <div className="tomato-action">
      {html}
    </div>
  );
};

export default TomatoAction;