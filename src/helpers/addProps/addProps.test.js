import { always } from 'ramda';
import { addProps } from './addProps';

describe('addProps unit test', () => {
  const a = {
    a1: 1
  };

  const b = {
    b1: 2
  }

  it('should add apply and merge new props in a object', () => {
    const c = ({a1}, {b1}) => `${a1} + ${b1}`;

    const expectedResult = {
      ...a,
      c: '1 + 2'
    };

    const result = addProps({ c }, a, b);


    expect(result).toEqual(expectedResult);
  });

  it('should add apply and merge new props if passed just one arg', () => {
    const c = (value) => value;

    const expectedResult = {
      ...a,
      c: {
        a1: 1
      }
    };

    const result = addProps({ c }, a);


    expect(result).toEqual(expectedResult);
  });
});
