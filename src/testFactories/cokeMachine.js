import { always, add } from 'ramda'
import { Factory } from 'rosie'

import { ProductBuilder } from './product';

export const CokeMachineBuilder = new Factory()
  .attr('cost', () => 1.5)
  .attr('total', always(0))
  .attr('products', () => ProductBuilder.buildList(5))
