import { ADD, CHOOSE, REMOVE, RETURN, RESTART } from './types';

export const insertCoinAction = (value) => ({
  type: ADD,
  value
});

export const chooseProductAction = (product) => ({
  type: CHOOSE,
  product
});

export const removeProductAction = () => ({
  type: REMOVE
});

export const returnCoinAction = () => ({
  type: RETURN
});

export const restartAction = () => ({
  type: RESTART
});
