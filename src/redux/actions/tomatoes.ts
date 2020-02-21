import {ADD_TOMATO, INIT_TOMATOES, UPDATE_TOMATO} from '../actionTypes';

const addTomato = (payload: Tomato) => {
  return {
    type: ADD_TOMATO,
    payload
  };
};

const initTomatoes = (payload: Tomato[]) => {
  return {
    type: INIT_TOMATOES,
    payload
  };
};

const updateTomato = (payload: Tomato) => {
  return {
    type: UPDATE_TOMATO,
    payload
  };
};

export default {
  addTomato,
  initTomatoes,
  updateTomato
};