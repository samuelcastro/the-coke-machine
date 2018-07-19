import React from 'react';
import { curryN } from 'ramda';
import renderer from 'react-test-renderer';
import Panel from '../Panel';

describe('Unit Testing <Panel />', () => {
  let wrapper, panelComponent, payFn, chooseFn, takeFn, returnCoinFn;

  const mockedCoins = [0.25, 0.10, 0.05];
  const mockedProducts = [
    {id: 1, name: 'Coke', price: 1.50},
    {id: 2, name: 'Diet Coke', price: 1.50}
  ];

  const expectElementClick = (wrapper, el, mockedFn, expectToEqual) => {
    const buttonEl = wrapper.find(el).children().first();

    expect(mockedFn.mock.calls.length).toEqual(0);

    buttonEl.simulate('click');

    expect(mockedFn.mock.calls.length).toEqual(1);
    expect(mockedFn.mock.calls[0][0]).toEqual(expectToEqual);
  }

  beforeEach(() => {
    payFn = jest.fn();
    chooseFn = jest.fn();
    takeFn = jest.fn();
    returnCoinFn = jest.fn()

    panelComponent = (
      <Panel
        coins={mockedCoins}
        products={mockedProducts}
        onPay={value => coin => payFn(value)}
        onChoose={product => event => chooseFn(product)}
        onRemove={takeFn}
        onReturnCoin={returnCoinFn}
      />
    );

    wrapper = shallow(panelComponent);
  });

  describe('Rendering Panel', () => {
    it('should render <Panel /> correctly', () => {
      const tree = renderer
        .create(panelComponent)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render all insert coins buttons', () => {
      const coinsElements = wrapper.find('section.coins').children();

      expect(coinsElements.length).toEqual(3);
    });

    it('should render all available products', () => {
      const productsElement = wrapper.find('section.products').children();

      expect(productsElement.length).toEqual(2);
    });

    it('should render the take product option', () => {
      const takeElement = wrapper.find('section.take').children();

      expect(takeElement.length).toEqual(1);
    });

    it('should render the return coin option', () => {
      const coinReturnElement = wrapper.find('section.coin-return').children();

      expect(coinReturnElement.length).toEqual(1);
    });
  });

  describe('UI user Iteration', () => {
    afterEach(() => {
      payFn.mockReset();
      chooseFn.mockReset();
      takeFn.mockReset();
      returnCoinFn.mockReset();
    });

    it(`should insert ${mockedCoins[0]}`, () => {
      expectElementClick(wrapper, 'section.coins', payFn, mockedCoins[0])
    });

    it(`should choose ${mockedProducts[0].name}`, () => {
      expectElementClick(wrapper, 'section.products', chooseFn, mockedProducts[0])
    });

    it(`should take ${mockedProducts[0].name}`, () => {
      expectElementClick(wrapper, 'section.take', takeFn)
    });

    it('should return coin', () => {
      expectElementClick(wrapper, 'section.coin-return', returnCoinFn)
    });
  });
});
