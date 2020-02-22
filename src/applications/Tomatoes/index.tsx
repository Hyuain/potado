import React from 'react';
import TomatoAction from '@/components/Tomatoes/TomatoAction';
import TomatoList from '@/components/Tomatoes/TomatoList';
import actions from '@/redux/actions';
import {connect} from 'react-redux';
import {getFinishedTomatoes, getUnfinishedTomato} from '@/redux/selectors';
import {groupByDay} from '@/api/utils';
import './style.less';
import {RootState} from '@/redux/reducers';
import {Dispatch} from 'redux';

interface ITomatoesProps {
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const Tomatoes = (props: ReduxType) => {
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

const mapStateToProps = (state: RootState, ownProps: ITomatoesProps) => {
  const tomatoes = state.tomatoes;
  const finishedTomatoes = getFinishedTomatoes(state);
  const unfinishedTomato = getUnfinishedTomato(state);
  const finishedTomatoesByDay: TomatoesGroup = groupByDay(finishedTomatoes, 'started_at');
  return {
    tomatoes,
    finishedTomatoes,
    unfinishedTomato,
    finishedTomatoesByDay,
    ...ownProps
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addTomato(payload: Tomato) {
      dispatch(actions.addTomato(payload));
    },
    updateTomato(payload: Tomato) {
      dispatch(actions.updateTomato(payload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tomatoes);