import { range, map } from 'ramda';

const buildCoin = (n) => (Math.random() * n).toFixed(2);

export const CoinsBuilder = {
  build: (n) => map(() => buildCoin(0.25), range(1, n))
};
