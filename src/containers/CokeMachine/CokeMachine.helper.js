import { curry } from 'ramda';

import {
  insertCoinAction,
  chooseProductAction,
  removeProductAction,
  restartAction,
  returnCoinAction
} from '../../actions';

const dispatchRestart = curry((dispatch, ms) => {
  dispatch((dispatch, getState) => {
    const {coke: {isReturningCoins}} = getState();

    isReturningCoins && setTimeout(() => dispatch(restartAction()), ms);
  });
});

export const onPayDispatch = curry((dispatch, value, event) => {
  return dispatch(insertCoinAction(value));
});

export const onChooseDispatch = curry((dispatch, product, event) => {
  return dispatch(chooseProductAction(product));
});

export const onRemoveDispatch = curry((dispatch, event) => {
  dispatch(removeProductAction());
  dispatchRestart(dispatch, 2000);
});

export const onReturnCoinDispatch = curry((dispatch, event) => {
  dispatch(returnCoinAction());
  dispatchRestart(dispatch, 2000)
});
