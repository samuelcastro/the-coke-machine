import { merge, mergeWith, indexBy, curry, values, or, reduce } from 'ramda';

export const mergeArrayByProp = curry((propFn, ...args) =>
  reduce(
    (acc, cur) =>
      values(
        mergeWith(
          merge,
          indexBy(propFn, or(acc, [])),
          indexBy(propFn, or(cur, []))
        )
      ),
    [],
    args
  )
);
