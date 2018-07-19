import {
  isTotalLtCost,
  isTotalGtCost,
  isTotalGteCost,
  subtractOne,
  isTotalGtZero,
  isNotReturningCoins,
  isReturningChanges,
  hasSelectedProduct,
  hasNoSelectedProduct,
} from './coke.helper';


describe('Unit testing common helper functions', () => {
  it('should check if total is less than cost', () => {
    expect(isTotalLtCost({total: 10, cost: 20})).toEqual(true);
  });

  it('should check if total is greater than cost', () => {
    expect(isTotalGtCost({total: 20, cost: 10})).toEqual(true);
  });

  it('should check if total is greater or equal cost', () => {
    expect(isTotalGteCost({total: 20, cost: 20})).toEqual(true);
  });

  it('should just subtractOne', () => {
    expect(subtractOne(2)).toEqual(1);
  });

  it('should check if total is greater than zero', () => {
    expect(isTotalGtZero({total: 10})).toEqual(true);
  });

  it('should check if its not returning coins', () => {
    expect(isNotReturningCoins({isReturningCoins: false})).toEqual(true);
  });

  it('should check if its returning changes', () => {
    expect(isReturningChanges({total: 20, cost: 10, isReturningCoins: true})).toEqual(true);
  });

  it('should check if has selected product', () => {
    expect(hasSelectedProduct({selectedProduct: 'my product'})).toEqual(true);
  });

  it('should check if does not have selected producut', () => {
    expect(hasNoSelectedProduct({selectedProduct: undefined})).toEqual(true);
  });
});
