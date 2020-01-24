import React from 'react';
import axios from '../../../config/axios';

import {Button, Input} from 'antd';
import './TomatoAction.less';

interface ITomatoActionProps {
  startTomato: () => void,
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
      const response = await axios.put(`tomatoes/${props.unfinishedTomato.id}`, {description});
      setDescription('');
      console.log(response);
    } catch (e) {

    }
  };

  if (props.unfinishedTomato === undefined) {
    html = <Button className="start-button" onClick={props.startTomato}>开始番茄</Button>;
  } else {
    const startAt = Date.parse(props.unfinishedTomato.start_at);
    const duration = props.unfinishedTomato.duration;
    const timeNow = new Date().getTime();
    if (timeNow - startAt > duration) {
      html = (
        <div>
          <Input
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            onKeyUp={onKeyup}
          />
        </div>
      );
    } else {
      html = <div>倒计时</div>;
    }
  }


  return (
    <div className="tomato-action">
      {html}
    </div>
  );
};

export default TomatoAction;