import {
  allPass, equals, isNil, find,
  compose, flip, complement,
  ifElse, cond, T
} from 'ramda';

import { addProps } from '../../../helpers';

import {
  quantity,
  product,
  products,
  selectedProduct,
  isTotalGteCost,
  isTotalLtCost,
  isGtZero,
  hasNoSelectedProduct,
  removeProductMessage,
  soldOutMessage,
  emptyMachineMessage,
  insertBeforeSelectMessage
} from '../coke.helper';

export const isProductSoldOut = compose(equals(0), quantity, flip(product));

export const isValidSelection = allPass([
  isTotalGteCost,
  hasNoSelectedProduct,
  complement(isProductSoldOut)
]);

export const getProduct = ifElse(isValidSelection, flip(product), selectedProduct);
export const isQntGtZero = compose(isGtZero, quantity)
export const isMachineEmpty = compose(isNil, find(isQntGtZero), products)

export const getSelectProductMessage = cond([
  [isTotalLtCost, insertBeforeSelectMessage],
  [isMachineEmpty, emptyMachineMessage],
  [isProductSoldOut, soldOutMessage],
  [T, removeProductMessage]
])

export const chooseProduct = addProps({
  selectedProduct: getProduct,
  message: getSelectProductMessage
});
