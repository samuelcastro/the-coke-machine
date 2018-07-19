import { commerce, random } from 'faker'
import { Factory } from 'rosie'

export const ProductBuilder = new Factory()
  .sequence('id')
  .attr('name', commerce.productName)
  .attr('quantity', random.number)
