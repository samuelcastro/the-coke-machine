import { head, last, prop, add } from 'ramda';
import { CokeMachineBuilder, CoinsBuilder } from '../../../testFactories';

import { addCoin } from '../addCoins/addCoins';
import { chooseProduct } from './chooseProduct';
import { removeProduct } from '../removeProduct/removeProduct';
import { returnCoin } from '../returnCoins/returnCoins';

import {
  isTotalLtCost,
  calcTotal,
  getTotal,
  getCoinMessage,
  restart
} from '../coke.helper';

describe('Select Product', () => {
  let coins, coin1, coin2, state;

  beforeEach(() => {
    state = CokeMachineBuilder.build();
    coins = CoinsBuilder.build(5);
    coin1 = head(coins);
    coin2 = last(coins);
  });

  it('should attempt to select a product before adding necessary coins', () => {
    const product = head(state.products)
    const stateA = addCoin(state, {value: 1.49})
    const stateB = chooseProduct(stateA, {product});

    const expectedState = {
      ...stateB,
      selectedProduct: undefined,
      message: `Insert ${stateB.cost} before making a selection.`
    }


    expect(stateB).toEqual(expectedState);
  });

  it('should select a product after added coins', () => {
    const product = head(state.products)
    const stateA = addCoin(state, {value: 3.0})
    const stateB = chooseProduct(stateA, {product});

    const expectedState = {
      ...stateB,
      selectedProduct: product,
      message: `Please remove product.`
    }

    expect(stateB).toEqual(expectedState);
  });

  it('should select a product and any attempt to select before remove should be invalid', () => {
    const productA = head(state.products);
    const productB = last(state.products);
    const stateA = addCoin(state, {value: 3.0})
    const stateB = chooseProduct(stateA, {product: productA});
    const stateC = chooseProduct(stateB, {product: productB});
    const stateD = chooseProduct(stateC, {product: productB});

    const expectedState = {
      ...stateB,
      selectedProduct: productA,
      message: `Please remove product.`
    }

    expect(stateB).toEqual(expectedState);
  });

  it('should select a product and do not allow insert coins afterwards', () => {
    const product = head(state.products);
    const stateA = addCoin(state, {value: 3.0})
    const stateB = chooseProduct(stateA, {product});
    const stateC = addCoin(stateB, {value: 3.0})

    const expectedState = {
      ...stateB,
      selectedProduct: product,
      message: 'Please remove product.'
    }

    expect(stateC).toEqual(expectedState);
  });

  it('should not select a product that is sold out', () => {
    const localState = {
      ...state,
      products: [{
        id: 1,
        quantity: 0,
        name: 'test'
      }, {
        id: 2,
        quantity: 1,
        name: 'test'
      }]
    };

    const product = head(localState.products);
    const stateA = addCoin(localState, {value: 3.0});
    const stateB = chooseProduct(stateA, {product});

    const expectedState = {
      ...stateB,
      selectedProduct: undefined,
      message: 'Out of inventory, please make another selection.'
    }

    expect(stateB).toEqual(expectedState);
  });

  it('should not select any product if machine is empty', () => {
    const localState = {
      ...state,
      products: [{
        id: 1,
        quantity: 0,
        name: 'test'
      }, {
        id: 2,
        quantity: 0,
        name: 'test2'
      }]
    };

    const product = head(localState.products);
    const stateA = addCoin(localState, {value: 3.0});
    const stateB = chooseProduct(stateA, {product});

    const expectedState = {
      ...stateB,
      selectedProduct: undefined,
      message: 'Machine is empty.'
    }

    expect(stateB).toEqual(expectedState);
  });
})
