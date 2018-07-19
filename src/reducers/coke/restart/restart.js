import { F, always } from 'ramda';
import { addProps } from '../../../helpers';

import { welcomeMessage } from '../coke.helper';

export const restart = addProps({
  isReturningCoins: F,
  total: always(0),
  message: welcomeMessage
})
