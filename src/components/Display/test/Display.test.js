import React from 'react';
import renderer from 'react-test-renderer';
import Display from '../Display';

describe('Rendering Display', () => {
  const mockedValue = 'Welcome'

  it('should render <Display /> correctly', () => {
    const tree = renderer
      .create(<Display value={mockedValue} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a diplay value', () => {
    const wrapper = shallow(<Display value={mockedValue}/>);

    expect(wrapper.find('section').text()).toEqual(mockedValue);
  });
});
