import React from 'react';
import renderer from 'react-test-renderer';
import Fridge from '../Fridge';

describe('Rendering Fridge', () => {
  let fridge, wrapper;

  const mockedTitle = 'The Coke Machine';
  const mockedMessage = 'Welcome';
  const mockedCoins = [0.25, 0.10, 0.05];
  const mockedProducts = [{
    id: 1,
    name: 'Coke',
    quantity: 5
  }, {
    id: 2,
    name: 'Diet Coke',
    quantity: 5
  }]

  beforeEach(() => {
    fridge = <Fridge
      title={mockedTitle}
      coins={mockedCoins}
      products={mockedProducts}
      message={mockedMessage}
      onPayDispatch={jest.fn}
      onChooseDispatch={jest.fn}
      onRemoveDispatch={jest.fn}
      onReturnCoinDispatch={jest.fn}
    />

    wrapper = mount(fridge);
  });

  it('should render <Fridge /> correctly', () => {
    const tree = renderer
      .create(fridge)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should contain title', () => {
    expect(wrapper.contains(<h1>{mockedTitle}</h1>)).toEqual(true);
  });

  it('should contain a Display component', () => {
    expect(wrapper.find('Display').length).toEqual(1);
  });

  it('should contain a Panel component', () => {
    expect(wrapper.find('Panel').length).toEqual(1);
  });
});
