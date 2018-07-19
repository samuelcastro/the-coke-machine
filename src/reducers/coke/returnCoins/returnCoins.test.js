import { head, last } from 'ramda';
import { CokeMachineBuilder, CoinsBuilder } from '../../../testFactories';

import { addCoin } from '../addCoins/addCoins';
import { chooseProduct } from '../chooseProduct/chooseProduct';
import { removeProduct } from '../removeProduct/removeProduct';
import { returnCoin } from '../returnCoins/returnCoins';

describe('Return Coin', () => {
  let coins, coin1, coin2, state;

  beforeEach(() => {
    state = CokeMachineBuilder.build();
    coins = CoinsBuilder.build(5);
    coin1 = head(coins);
    coin2 = last(coins);
  });

  it('should return coin', () => {
    const stateA = addCoin(state, {value: 0.15});
    const stateB = addCoin(stateA, {value: 0.15});
    const stateC = returnCoin(stateB);

    const expectedState = {
      ...stateC,
      message: `Returning $${Number(stateC.total).toFixed(2)}`,
      isReturningCoins: true
    };

    expect(stateC).toEqual(expectedState)
  });

  it('should not let return coin if product was selected already', () => {
    const product = head(state.products);
    const stateA = addCoin(state, {value: 1.60});
    const stateB = chooseProduct(stateA, {product})
    const stateC = returnCoin(stateB);

    const expectedState = {
      ...stateC,
      message: 'Please remove product.',
      total: stateA.total,
      isReturningCoins: false
    };

    expect(stateC).toEqual(expectedState)
  });
});
