import React from 'react';
import axios from '../../config/axios';
import TomatoAction from './TomatoAction/TomatoAction';

import actions from '../../redux/actions';
import {connect} from 'react-redux';
import {TOMATO_FILTERS} from '../../constants';
import {getTomatoesByFilter} from '../../redux/selectors';

import './Tomatoes.less';

interface ITomatoesProps {
  tomatoes: any[],
  addTomato: (payload: any) => any,
  initTomatoes: (payload: any) => any,
  updateTomato: (payload: any) => any,
  unfinishedTomato: any
}

const Tomatoes = (props: ITomatoesProps) => {

  React.useEffect(() => {
    const getTomatoes = async () => {
      try {
        const response = await axios.get('tomatoes');
        props.initTomatoes(response.data.resources);
      } catch (e) {
      }
    };
    getTomatoes();
    // eslint-disable-next-line
  }, []);

  const startTomato = async () => {
    try {
      const response = await axios.post('tomatoes', {duration: 10* 60 * 1000});
      props.addTomato(response.data.resource);
    } catch (e) {

    }
  };

  return (
    <div className="tomatoes">
      <TomatoAction
        startTomato={startTomato}
        updateTomato={props.updateTomato}
        unfinishedTomato={props.unfinishedTomato}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const tomatoes = state.tomatoes;
  const unfinishedTomato = getTomatoesByFilter(state, TOMATO_FILTERS.UNFINISHED);
  return {
    tomatoes,
    unfinishedTomato
  };
};

const mapDispatchToProps = {
  addTomato: actions.addTomato,
  updateTomato: actions.updateTomato,
  initTomatoes: actions.initTomatoes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tomatoes);