import { prop } from 'ramda';
import { mergeArrayByProp } from './mergeArrayByProp';

describe('mergeArrayByProp unit test', () => {
  const array = [
    {
      key: 'a',
      value: 'hi'
    },
    {
      key: 'b',
      value: 'hello'
    },
    {
      key: 'c',
      value: ';)'
    }
  ];

  const newArray = [
    {
      key: 'a',
      value: 'test'
    }
  ];

  it('should merge array by props', () => {
    const key = prop('key');
    const result = mergeArrayByProp(key, array, newArray);

    const expected = [
      {
        key: 'a',
        value: 'test'
      },
      {
        key: 'b',
        value: 'hello'
      },
      {
        key: 'c',
        value: ';)'
      }
    ];

    expect(result).toEqual(expected);
  });
});
