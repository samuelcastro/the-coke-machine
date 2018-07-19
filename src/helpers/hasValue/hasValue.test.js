import { propHasValue, pathHasValue } from '../';

describe('hasValue unit test', () => {
  const objOfValues = {
    a: {
      a1: 1,
      a2: null
    }
  };

  it('a prop should have a value', () => {
    const result = propHasValue('a', objOfValues);

    expect(result).toBe(true);
  });

  it('d prop should not have value', () => {
    const result = propHasValue('d', objOfValues);

    expect(result).toBe(false);
  });

  it('a1 path should have value', () => {
    const result = pathHasValue(['a', 'a1'], objOfValues);

    expect(result).toBe(true);
  });

  it('a2 path should not have value', () => {
    const result = pathHasValue(['a', 'a2'], objOfValues);

    expect(result).toBe(false);
  });
});
