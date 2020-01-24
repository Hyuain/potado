import {ADD_TOMATO, INIT_TOMATOES, UPDATE_TOMATO} from '../actionTypes';

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

const updateTomato = (payload: any) => {
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