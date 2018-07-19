import { overProp } from './overProp';
import { add } from 'ramda';

describe('lengthOfObject unit test', () => {
  const a = {
    a1: 1,
    a2: 2
  };

  const b = {
    b1: {
      b2: 3,
      b3: 'test'
    }
  };

  it('should add 1 to a prop and return the original object', () => {
    const expectedResult = {
      ...a,
      a2: a.a2 + 1
    };

    const result = overProp('a2', add(1), a);

    expect(result).toEqual(expectedResult);
  });
});
