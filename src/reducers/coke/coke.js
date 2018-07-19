/*
 *
 * TODO: In a real world situation I would use Redux-Saga or Redux-Oservable to put
 * all business logic, and slip it out into many redux containers/hoc to inject props
 * using Releselect to cache functions computation with memoization.
 * However, this is a really simple app. I'm not going to worry about it right now. ;)
 *
 */

import { ADD, CHOOSE, REMOVE, RETURN, RESTART } from '../../actions/types';

import { addCoin } from './addCoins/addCoins';
import { chooseProduct } from './chooseProduct/chooseProduct';
import { removeProduct } from './removeProduct/removeProduct';
import { returnCoin } from './returnCoins/returnCoins';
import { restart } from './restart/restart';

const initialState = {
  title: 'The Coke Machine',
  message: 'Welcome',
  coins: [0.25, 0.10, 0.05],
  cost: 1.50,
  total: 0,
  products: [{
    id: 1,
    name: 'Coke',
    quantity: 5
  }, {
    id: 2,
    name: 'Diet Coke',
    quantity: 2
  }]
};

const stateReducerMap = {
  [ADD]: addCoin,
  [CHOOSE]: chooseProduct,
  [REMOVE]: removeProduct,
  [RETURN]: returnCoin,
  [RESTART]: restart
}

export default (state = initialState, action) => {
  const stateReducer = stateReducerMap[action.type];

  return stateReducer ? stateReducer(state, action) : state;
};
