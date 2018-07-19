import { head } from 'ramda';
import { addCoin } from '../addCoins/addCoins';
import { restart } from './restart';
import { CokeMachineBuilder, CoinsBuilder } from '../../../testFactories';

describe('Restart', () => {
  let coins, coin, state;

  beforeEach(() => {
    state = CokeMachineBuilder.build();
    coins = CoinsBuilder.build(5);
    coin = head(coins);
  });

  it('should return coin', () => {
    const stateA = addCoin(state, {value: coin})
    const stateB = restart(state);

    const expectedState = {
      ...stateB,
      message: 'Welcome',
      isReturningCoins: false,
      total: 0
    };

    expect(stateB).toEqual(expectedState)
  });
});
