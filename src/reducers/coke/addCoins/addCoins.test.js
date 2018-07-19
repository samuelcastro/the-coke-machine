import { head, last, prop, add, compose, gte, subtract } from 'ramda';
import { CokeMachineBuilder, CoinsBuilder } from '../../../testFactories';

import { addCoin, getCoinMessage, calcTotal, getTotal } from './addCoins';
import { chooseProduct } from '../chooseProduct/chooseProduct';
import { removeProduct } from '../removeProduct/removeProduct';
import { returnCoin } from '../returnCoins/returnCoins';

import { isTotalLtCost, isTotalGteCost } from '../coke.helper';

describe('Insert Coin', () => {
  let coins, coin1, coin2, state;

  beforeEach(() => {
    state = CokeMachineBuilder.build();
    coins = CoinsBuilder.build(5);
    coin1 = head(coins);
    coin2 = last(coins);
  });

  it('should insert a coin and return the correct state', () => {
    const stateA = addCoin(state, {value: coin1});
    const stateB = addCoin(stateA, {value: coin2});
    const totalA = add(state.total, coin1);
    const totalB = add(totalA, coin2);

    const expectedResultA = {
      ...stateA,
      total: totalA.toFixed(2)
    };

    const expectedResultB = {
      ...state,
      total: totalB.toFixed(2),
      message: isTotalGteCost(stateB) ? 'Make a Selection.' : totalB.toFixed(2)
    };


    expect(stateA).toEqual(expectedResultA);
    expect(stateB).toEqual(expectedResultB);
  });

  it('should check if total is less than cost', () => {
    const expectedResultA = isTotalLtCost(state)
    const stateA = addCoin(state, {value: coin1});
    const stateB = addCoin(stateA, {value: coin2});
    const expectedResultB = isTotalLtCost(stateB);

    expect(expectedResultA).toEqual(state.total < state.cost);
    expect(expectedResultB).toEqual(stateB.total < stateB.cost);
  });

  it('should not let add coin its still returning it', () => {
    const product = head(state.products);
    const stateA = addCoin(state, {value: 0.60});
    const stateB = returnCoin(stateA);
    const stateC = addCoin(stateB, {value: 0.10});

    const expectedState = {
      ...stateC,
      message: `Returning $${Number(stateB.total).toFixed(2)}`,
      total: stateB.total,
      isReturningCoins: true
    };

    expect(stateC).toEqual(expectedState)
  });

  it('should not let add coin if still returning it after make a selection and remove the product', () => {
    const product = head(state.products);
    const stateA = addCoin(state, {value: 1.60});
    const stateB = chooseProduct(stateA, {product});
    const stateC = removeProduct(stateB);
    const stateD = addCoin(stateC, {value: 0.10})

    const expectedState = {
      ...stateD,
      message: `Returning $${subtract(stateB.total, stateB.cost).toFixed(2)}`,
      total: stateB.total,
      isReturningCoins: true
    };

    expect(stateD).toEqual(expectedState)
  });

  it('should show up the return coin message when attempting to remove and add coins sequentially ', () => {
    const stateA = addCoin(state, {value: 0.10});
    const stateB = returnCoin(stateA);
    const stateC = removeProduct(stateB);
    const stateD = addCoin(stateC, {value: 0.30});

    const expectedState = {
      ...stateD,
      message: `Returning $${Number(stateB.total).toFixed(2)}`,
      total: stateD.total,
      isReturningCoins: true
    };

    expect(stateD).toEqual(expectedState)
  });

  it('should let add new coins after remove product', () => {
    const product = head(state.products);
    const stateA = addCoin(state, {value: 1.5})
    const stateB = chooseProduct(stateA, {product});
    const stateC = removeProduct(stateB);
    const stateD = addCoin(stateC, {value: 0.15});

    const expectedState = {
      ...stateD,
      message: Number(stateD.total).toFixed(2),
      total: stateD.total
    };

    expect(stateD).toEqual(expectedState)
  });

  it('should calc total', () => {
    const total = calcTotal(state, {value: 3});

    expect(total).toEqual(state.total + 3.0);
  });

  it('should get total', () => {
    const localStateA = {
      total: 2,
      cost: 1
    };

    const localStateB = {
      total: 2,
      cost: 3
    };

    const totalA = getTotal(localStateA, {value: 3});
    const totalB = getTotal(localStateB, {value: 3});

    expect(totalA.toFixed(2)).toEqual(localStateA.total.toFixed(2));
    expect(totalB).toEqual((localStateB.total + 3.0).toFixed(2));
  });

  it('should get total message', () => {
    const localStateA = {
      total: 2,
      cost: 1
    };

    const localStateB = {
      total: 2,
      cost: 3
    };

    const messageA = getCoinMessage(localStateA);
    const messageB = getCoinMessage(localStateB);

    expect(messageA).toEqual('Make a Selection.');
    expect(messageB).toEqual(localStateB.total.toFixed(2));
  });
})
