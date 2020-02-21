import React from 'react';
import {connect} from 'react-redux';
import actions from '@/redux/actions';
import {RootState} from '@/redux/reducers';
import {Dispatch} from 'redux';
import {getIncompleteTodos} from '@/redux/selectors';
import TodoInput from '@/components/Todos/TodoInput';
import TodoItem from '@/components/Todos/TodoItem';
import './style.less';

interface ITodosProps {
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const Todos = (props: ReduxType) => {

  return (
    <div className="todos">
      <TodoInput
        addTodo={props.addTodo}
      />
      <div className="todo-list">
        {
          props.incompleteTodos.map((todo: Todo) => (
            <TodoItem
              key={todo.id} {...todo}
              updateTodo={props.updateTodo}
              editTodo={props.editTodo}
            />
          ))
        }
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState, ownProps: ITodosProps) => {
  const incompleteTodos = getIncompleteTodos(state);
  return {
    incompleteTodos,
    ...ownProps
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addTodo(payload: Todo) {
      dispatch(actions.addTodo(payload));
    },
    editTodo(payload: number) {
      dispatch(actions.editTodo(payload));
    },
    updateTodo(payload: Todo) {
      dispatch(actions.updateTodo(payload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);