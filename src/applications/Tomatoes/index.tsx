import React from 'react';
import TomatoAction from '@/components/Tomatoes/TomatoAction';
import TomatoList from '@/components/Tomatoes/TomatoList';
import actions from '@/redux/actions';
import {connect} from 'react-redux';
import {TOMATO_FILTERS} from '@/constants';
import {getTomatoesByFilter, groupByDay} from '@/redux/selectors';
import './style.less';

interface ITomatoesProps {
  tomatoes: any[],
  addTomato: (payload: any) => {
    type: string,
    payload: any
  },
  updateTomato: (payload: any) => {
    type: string,
    payload: any
  },
  unfinishedTomato: any,
  finishedTomatoes: any[],
  finishedTomatoesByDay: any
}

const Tomatoes = (props: ITomatoesProps) => {

  return (
    <div className="tomatoes">
      <TomatoAction
        addTomato={props.addTomato}
        updateTomato={props.updateTomato}
        unfinishedTomato={props.unfinishedTomato}
      />
      <TomatoList
        finishedTomatoes={props.finishedTomatoesByDay}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const tomatoes = state.tomatoes;
  const finishedTomatoes = getTomatoesByFilter(state, TOMATO_FILTERS.FINISHED);
  const unfinishedTomato = getTomatoesByFilter(state, TOMATO_FILTERS.UNFINISHED);
  const finishedTomatoesByDay = groupByDay(finishedTomatoes, 'started_at');
  return {
    tomatoes,
    finishedTomatoes,
    unfinishedTomato,
    finishedTomatoesByDay
  };
};

const mapDispatchToProps = {
  addTomato: actions.addTomato,
  updateTomato: actions.updateTomato,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tomatoes);