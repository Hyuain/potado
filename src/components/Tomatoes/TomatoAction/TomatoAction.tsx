import React from 'react';
import axios from '../../../config/axios';

import {connect} from 'react-redux';
import actions from '../../../redux/actions/index'

import {Button} from 'antd';
import './TomatoAction.less';

const TomatoAction = () => {
  const startTomato = async () => {
    try {
      const response = await axios.post('tomatoes', {duration: 25 * 60 * 1000});
      console.log(response.data);
    } catch (e) {

    }
  };

  return (
    <div className="tomato-action">
      <Button className="start-button" onClick={startTomato}>开始番茄</Button>
    </div>
  );
};

const mapStateToProps = (state:any, ownProps: any) => ({
  ...ownProps
});

const mapDispatchToProps = {
  addTomato: actions.addTomato
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TomatoAction);