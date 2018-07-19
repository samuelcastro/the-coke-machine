import {
  useWith, compose, both, ifElse, cond, T, add
} from 'ramda';

import { addProps } from '../../../helpers';

import {
  removeProductMessage,
  returnChangesMessage,
  makeASelectionMessage,
  returnCoinMessage,
  total,
  value,
  toFixed,
  isTotalLtCost,
  isReturningCoins,
  isNotReturningCoins,
  hasSelectedProduct,
  isReturningChanges
} from '../coke.helper';

export const calcTotal = useWith(add, [total, value]);
export const calcTotalFixed = compose(toFixed(2), calcTotal);
export const shouldCalcTotal = both(isTotalLtCost, isNotReturningCoins);
export const getTotal = ifElse(shouldCalcTotal, calcTotalFixed, total);
export const getFormatedTotal = compose(toFixed(2), total);

export const getCoinMessage = cond([
  [isReturningChanges, returnChangesMessage],
  [isReturningCoins, returnCoinMessage],
  [hasSelectedProduct, removeProductMessage],
  [isTotalLtCost, getFormatedTotal],
  [T, makeASelectionMessage]
]);

const addTotal = addProps({total: getTotal});
const addCoinMessage = addProps({message: getCoinMessage});
export const addCoin = compose(addCoinMessage, addTotal);
