import {ADD_TOMATO} from '../actionTypes';

const addTomato = (payload: any) => {
  return {
    type: ADD_TOMATO,
    payload
  }
};

export default {
  addTomato
}