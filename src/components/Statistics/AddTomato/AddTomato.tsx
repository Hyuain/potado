import React from 'react';
import axios from '../../../config/axios';
import moment from 'moment';
import {Button, DatePicker, Input, Modal, Popover, message} from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';

const AddTomato = (props: any) => {
  const [description, setDescription] = React.useState('');
  const [startedAt, setStartedAt] = React.useState<any>(null);
  const [visible, setVisible] = React.useState(false);

  const onKeyUp = (e: any) => {
    if (e.keyCode === 13) {
      if (inputCheck()) {
        addTomato();
      }
    }
  };

  const onConfirm = () => {
    if(inputCheck()){
      addTomato();
    }
  };

  const inputCheck = () => {
    if (description === '') {
      message.warning('还是说点儿什么吧');
      return false;
    }
    return true;
  };

  const addTomato = async () => {
    if (description === '') {
      setDescription('这是一个没有描述的番茄');
    }
    // add 会修改原来的时间
    const endedAt = moment(startedAt).add(25, 'minutes');
    try {
      const response = await axios.post('tomatoes', {
        started_at: startedAt.format(),
        ended_at: endedAt.format(),
        description: description,
        manually_created: true
      });
      setDescription('');
      setStartedAt(null);
      props.addTomato(response.data.resource);
      setVisible(false);
    } catch (e) {
      message.error('网络好像有点不太好哦，一会儿再试吧');
    }
  };

  return (
    <div>
      <Modal
        title="补记一个番茄"
        visible={visible}
        onOk={onConfirm}
        onCancel={() => setVisible(false)}
        okText="确认"
        cancelText="取消"
      >
        <div className="add-model-item">
          <span>番茄的开始时间：</span>
          <DatePicker
            locale={locale}
            placeholder=""
            showTime
            value={startedAt}
            onOk={(value) => setStartedAt(value)}
            onChange={(value) => setStartedAt(value)}
          />
        </div>
        <div className="add-model-item">
          <span>番茄描述：</span>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyUp={onKeyUp}
          />
        </div>
      </Modal>
      <Popover content="补记番茄">
        <Button onClick={() => setVisible(true)} icon="plus"/>
      </Popover>
    </div>
  );
};

export default AddTomato;