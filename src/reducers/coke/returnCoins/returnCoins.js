import { both, ifElse, compose } from 'ramda';
import { addProps } from '../../../helpers';

import {
  isTotalGtZero,
  hasNoSelectedProduct,
  isReturningCoins,
  returnCoinMessage,
  message
} from '../coke.helper'

export const isAllowedReturnCoin = both(isTotalGtZero, hasNoSelectedProduct);
export const messageIfHasCoin = ifElse(isReturningCoins, returnCoinMessage, message);
export const addReturnCoinChanges = addProps({isReturningCoins: isAllowedReturnCoin});
export const addReturnCoinMessage = addProps({message: messageIfHasCoin});
export const returnCoin = compose(addReturnCoinMessage, addReturnCoinChanges);
