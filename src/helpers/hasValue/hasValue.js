import { propOr, pathOr, compose, curry } from 'ramda';

export const isTrue = item => !!item;

export const propHasValue = curry(compose(isTrue, propOr(null)));
export const pathHasValue = curry(compose(isTrue, pathOr(null)));
