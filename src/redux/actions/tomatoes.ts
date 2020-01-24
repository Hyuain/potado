import {ADD_TOMATO, INIT_TOMATOES} from '../actionTypes';

const addTomato = (payload: any) => {
  return {
    type: ADD_TOMATO,
    payload
  };
};

const initTomatoes = (payload: any[]) => {
  return {
    type: INIT_TOMATOES,
    payload
  };
};

export default {
  addTomato,
  initTomatoes
};