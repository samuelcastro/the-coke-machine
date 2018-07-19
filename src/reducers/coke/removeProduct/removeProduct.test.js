import { head, last, prop, add } from 'ramda';
import { mergeArrayByProp } from '../../../helpers';
import { CokeMachineBuilder, CoinsBuilder } from '../../../testFactories';

import { addCoin } from '../addCoins/addCoins';
import { chooseProduct } from '../chooseProduct/chooseProduct';
import { removeProduct } from './removeProduct';
import { returnCoin } from '../returnCoins/returnCoins';

import {
  isTotalLtCost,
  calcTotal,
  getTotal,
  getCoinMessage,
  restart
} from '../coke.helper';

describe('Remove Product', () => {
  let coins, coin1, coin2, state;

  beforeEach(() => {
    state = CokeMachineBuilder.build();
    coins = CoinsBuilder.build(5);
    coin1 = head(coins);
    coin2 = last(coins);
  });

  it('should attempt to remove a product with no selection', () => {
    const stateA = removeProduct(state);

    const expectedState = {
      ...stateA,
      message: 'No product to remove.'
    }

    expect(stateA).toEqual(expectedState)
  });

  it('should remove a selected product', () => {
    const product = head(state.products);
    const stateA = addCoin(state, {value: 0.75});
    const stateB = addCoin(stateA, {value: 0.85});
    const stateC = chooseProduct(stateB, {product})
    const stateD = removeProduct(stateC);

    const expectedState = {
      ...stateD,
      message: `Returning $${(stateC.total - stateC.cost).toFixed(2)}`,
      selectedProduct: undefined
    }

    expect(stateD).toEqual(expectedState)
  });

  it('should not reset total when attempting to remove a non-selected product', () => {
    const stateA = addCoin(state, {value: 0.75});
    const stateB = removeProduct(stateA);
    const stateC = addCoin(stateB, {value: 0.05});
    const total = add(stateA.total, 0.05);

    const expectedState = {
      ...stateC,
      message: total.toFixed(2),
      total: total.toFixed(2)
    }

    expect(stateC).toEqual(expectedState)
  });

  it('should not reset total after add the necessary coins and attempt to remove products without any selection', () => {
    const stateA = addCoin(state, {value: 1.5});
    const stateB = removeProduct(stateA);

    const expectedState = {
      ...stateB,
      message: 'No product to remove.',
      total: stateA.total
    }

    expect(stateB).toEqual(expectedState)
  });

  it('should remove a product and decrease the product quantity', () => {
    const product = head(state.products);
    const stateA = addCoin(state, {value: 1.50});
    const stateB = chooseProduct(stateA, {product})
    const stateC = removeProduct(stateB);
    const id = prop('id')

    const expectedState = {
      ...stateC,
      message: 'Welcome',
      selectedProduct: undefined,
      products: mergeArrayByProp(
        id,
        stateC.products,
        [{
          ...product,
          quantity: product.quantity - 1
        }]
      )
    }

    expect(stateC).toEqual(expectedState)
  })

  it('should return coins after remove product', () => {
    const product = head(state.products);
    const stateA = addCoin(state, {value: 1.60});
    const stateB = chooseProduct(stateA, {product})
    const stateC = removeProduct(stateB);

    const expectedState = {
      ...stateC,
      message: `Returning $${(stateC.total - stateC.cost).toFixed(2)}`,
      isReturningCoins: true
    };

    expect(stateC).toEqual(expectedState)
  });
});
