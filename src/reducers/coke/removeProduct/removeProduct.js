import {
  always, compose, converge, ifElse,
  cond, T, both, partial, of, when
} from 'ramda';

import { addProps, mergeArrayByProp, overProp } from '../../../helpers';

import {
  id,
  total,
  products,
  selectedProduct,
  isTotalGtCost,
  isNotReturningCoins,
  hasNoSelectedProduct,
  hasSelectedProduct,
  productRemoved,
  undefinedProp,
  subtractOne,
  returnChangesMessage,
  welcomeMessage,
  noProductToRemoveMessage
} from '../coke.helper';

export const isRemoveWithChanges = both(hasSelectedProduct, isTotalGtCost);
export const getSelectedProduct = ifElse(hasSelectedProduct, undefinedProp, selectedProduct);

const updateProductQuantity = partial(mergeArrayByProp, [id]);
const overQuantity = overProp('quantity', subtractOne);
const overQuantitySubtract = compose(of, overQuantity, selectedProduct)

export const updateQuantity = converge(updateProductQuantity, [products, overQuantitySubtract])
export const getProducts = ifElse(hasSelectedProduct, updateQuantity, products);

export const getRemoveProductMessage = cond([
  [isRemoveWithChanges, returnChangesMessage],
  [hasNoSelectedProduct, noProductToRemoveMessage],
  [T, welcomeMessage]
])

export const removeProductProps = addProps({
  selectedProduct: getSelectedProduct,
  isProductRemoved: hasSelectedProduct,
  products: getProducts,
  isReturningCoins: isRemoveWithChanges,
  message: getRemoveProductMessage
});

export const isProductRemoved = both(productRemoved, isNotReturningCoins);
export const totalIfProductRemoved = ifElse(isProductRemoved, always(0), total);
export const setTotalAfterRemove = addProps({total: totalIfProductRemoved});
export const addPropsAfterRemove = compose(setTotalAfterRemove, removeProductProps);
export const removeProduct = when(isNotReturningCoins, addPropsAfterRemove)
