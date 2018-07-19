import {
  always, compose, converge,
  lt, gt, gte, prop, flip,
  complement, both, curry,
  subtract
} from 'ramda';

import { propHasValue } from '../../helpers';

// common props
export const id = prop('id');
export const total = prop('total');
export const cost = prop('cost');
export const value = prop('value');
export const product = prop('product');
export const quantity = prop('quantity');
export const products = prop('products');
export const message = prop('message');
export const productRemoved = prop('isProductRemoved');
export const selectedProduct = prop('selectedProduct');
export const isReturningCoins = prop('isReturningCoins');
export const undefinedProp = always(undefined);
export const toFixed = curry((n, num) => Number(num).toFixed(n));
export const subtractAndFormat = compose(toFixed(2), subtract);

// messages
export const welcomeMessage = always('Welcome');
export const makeASelectionMessage = always('Make a Selection.');
export const insertBeforeSelectMessage = ({cost}) => `Insert ${cost} before making a selection.`;
export const removeProductMessage = always('Please remove product.');
export const noProductToRemoveMessage = always('No product to remove.');
export const returnChangesMessage = ({total, cost}) => `Returning $${subtractAndFormat(total, cost)}`;
export const returnCoinMessage = ({total}) => `Returning $${toFixed(2, total)}`
export const soldOutMessage = always('Out of inventory, please make another selection.');
export const emptyMachineMessage = always('Machine is empty.')

// common functions
export const isTotalLtCost = converge(lt, [total, cost]);
export const isTotalGtCost = converge(gt, [total, cost]);
export const isTotalGteCost = converge(gte, [total, cost]);
export const isGtZero = flip(gt)(0);
export const subtractOne = flip(subtract)(1);
export const isTotalGtZero = compose(isGtZero, total);
export const isNotReturningCoins = complement(isReturningCoins);
export const isReturningChanges = both(isReturningCoins, isTotalGtCost);
export const hasSelectedProduct = propHasValue('selectedProduct');
export const hasNoSelectedProduct = complement(hasSelectedProduct);
